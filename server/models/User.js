// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     _id: {type: String, required: true},
//     name: {type: String, required: true},
//     email: {type: String, required: true},
//     image: {type: String, required: true}
// })

// const User = mongoose.model('User', userSchema)

// export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     _id: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     image: { type: String, required: true },
//     favorites: { type: [String], default: [] } // ✅ Added favorites field
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     _id: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     image: { type: String, required: true },
//     isAdmin: { type: Boolean, default: false }, 
//     favorites: { type: [String], default: [] }
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   _id: { type: String, required: true }, // Clerk userId
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   image: { type: String },
//   isAdmin: { type: Boolean, default: false },
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  favorites: { type: [String], default: [] }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;