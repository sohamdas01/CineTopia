
import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  // Social media links configuration
  const socialLinks = {
    Facebook: 'https://www.facebook.com/soham.das.920883',
    Twitter: 'https://twitter.com/my-handle',
    Instagram: 'https://instagram.com/my-handle',
    LinkedIn: 'https://www.linkedin.com/in/soham-das-5a813528a',
    Email: 'mailto:Soham1937@gmail.com'
  };

  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-30 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <img className="w-36 h-auto" src={assets.finalLogo} alt="logo" />
          <p className="mt-6 text-sm">
            CineTopia is a modern movie ticket booking platform that lets users discover movies, select seats, and book tickets seamlessly.
            <br /> Enjoy a fast, secure, and user-friendly cinema booking experience.
          </p>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href={socialLinks.Email}>Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5">Need Help?</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Return & Refund Policy</a></li>
              <li><a href="#">Payment Methods</a></li>
              <li><a href="#">Track your Order</a></li>
              <li><a href={socialLinks.Email}>Contact Us</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="flex gap-4 text-xl">
              <a href={socialLinks.Facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href={socialLinks.Twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href={socialLinks.Instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href={socialLinks.LinkedIn} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href={socialLinks.Email}><MdEmail /></a>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} © CineTopia - All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer

