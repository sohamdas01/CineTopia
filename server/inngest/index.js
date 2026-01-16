
import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import sendEmail from "../configs/nodeMailer.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    await User.create({
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url
    });
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    await User.findByIdAndDelete(event.data.id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    await User.findByIdAndUpdate(id, {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url
    });
  }
);

const releaseSeatsAndDeleteBooking = inngest.createFunction(
  { id: 'release-seats-delete-booking' },
  { event: "app/checkpayment" },
  async ({ event, step }) => {
    // Wait exactly 10 minutes
    const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);
    await step.sleepUntil('wait-for-10-minutes', tenMinutesLater);

    await step.run('check-payment-status', async () => {
      const bookingId = event.data.bookingId;
      const booking = await Booking.findById(bookingId);

      // If booking doesn't exist or is already paid, do nothing
      if (!booking) return;

      if (!booking.isPaid) {
        console.log(`Releasing seats for booking ${bookingId} - 10 min expired`);
        
        const show = await Show.findById(booking.show);
        if (show) {
          // Release all booked seats
          booking.bookedSeats.forEach((seat) => {
            delete show.occupiedSeats[seat];
          });
          show.markModified('occupiedSeats');
          await show.save();
        }
        
        // Delete the unpaid booking
        await Booking.findByIdAndDelete(booking._id);
        console.log(`Booking ${bookingId} deleted - payment not received in 10 minutes`);
      }
    });
  }
);

const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  { event: "app/show.booked" },
  async ({ event }) => {
    const { bookingId } = event.data;

    const booking = await Booking.findById(bookingId)
      .populate({
        path: 'show',
        populate: { path: "movie" }
      })
      .populate('user');

    if (!booking || !booking.user || !booking.show) return;

    await sendEmail({
      to: booking.user.email,
      subject: `Payment Confirmation: "${booking.show.movie.title}" booked!`,
      body: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Hi ${booking.user.name},</h2>
          <p>Your booking for <strong style="color: #F84565;">"${booking.show.movie.title}"</strong> is confirmed.</p>
          <p><strong>Seats:</strong> ${booking.bookedSeats.join(', ')}</p>
          <p>Enjoy! 🍿</p>
        </div>
      `
    });
  }
);

const sendShowReminders = inngest.createFunction(
  { id: "send-show-reminders" },
  { cron: "0 */8 * * *" },
  async ({ step }) => {
    const now = new Date();
    const in8Hours = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const windowStart = new Date(in8Hours.getTime() - 10 * 60 * 1000);

    const reminderTasks = await step.run("prepare-tasks", async () => {
      const shows = await Show.find({
        showDateTime: { $gte: windowStart, $lte: in8Hours },
      }).populate('movie');

      const tasks = [];

      for (const show of shows) {
        if (!show.movie || !show.occupiedSeats) continue;

        const userIds = [...new Set(Object.values(show.occupiedSeats))];
        if (userIds.length === 0) continue;

        const users = await User.find({ _id: { $in: userIds } });

        for (const user of users) {
          tasks.push({
            userEmail: user.email,
            userName: user.name,
            movieTitle: show.movie.title,
            showDateTime: show.showDateTime,
          });
        }
      }
      return tasks;
    });

    if (reminderTasks.length === 0) {
      return { sent: 0, message: "No reminders" };
    }

    const results = await step.run('send-reminders', async () => {
      return await Promise.allSettled(
        reminderTasks.map(task => sendEmail({
          to: task.userEmail,
          subject: `Reminder: "${task.movieTitle}" starts soon!`,
          body: `<p>Hi ${task.userName}, your movie starts in 8 hours!</p>`
        }))
      );
    });

    const sent = results.filter(r => r.status === "fulfilled").length;
    return { sent, message: `Sent ${sent} reminders` };
  }
);

const sendNewShowNotifications = inngest.createFunction(
  { id: "send-new-show-notifications" },
  { event: "app/show.added" },
  async ({ event }) => {
    const { movieTitle } = event.data;
    const users = await User.find({});

    if (users.length === 0) return;

    await Promise.allSettled(
      users.map(user => sendEmail({
        to: user.email,
        subject: `🎬 New Show: ${movieTitle}`,
        body: `<p>Hi ${user.name}, new show "${movieTitle}" added!</p>`
      }))
    );
  }
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  releaseSeatsAndDeleteBooking,
  sendBookingConfirmationEmail,
  sendShowReminders,
  sendNewShowNotifications
];