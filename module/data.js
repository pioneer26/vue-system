const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    requird: true
  },
  email: {
    type: String,
    requird: true
  },
  password: {
    type: String,
    requird: true
  },
  identity:{
    type: String,
    requird: true
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  }
})
module.exports = UserDate = mongoose.model('myUser', userSchema);