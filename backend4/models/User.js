const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  highSchool: { type: String, required: true },
  password: { type: String, required: true },
  points: { type: Number, required: true, default: 0}
});

module.exports = mongoose.model('User', userSchema);