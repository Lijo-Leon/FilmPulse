// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     username: {
//         type : String,
//         required : true
//     },
//     email: {
//         type : String,
//         required : true,
//         unique : true
//     },
//     password: {
//         type : String,
//         required : true
//     },
//     profile: {
//         type : String,
//         required : false
//     },
//     subscriber:{
//         type : Boolean,
//         default : false
//     },
//     role: {
//         type : String,
//         required : false,
//         default:'FilmPulseUser'
//     }
// })

// module.exports = mongoose.model('Users', userSchema)

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  profile: { type: String, default: "" },
  bio: { type: String, default: "" },
  designation: { type: String, default: "" },

  subscriber: { type: Boolean, default: false },
  role: { type: String, default: "FilmPulseUser" }
})

module.exports = mongoose.model("Users", userSchema)
