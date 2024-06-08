const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type:String, required: true},
  password: { type:String, required: true},
  description: { type:String, required: true},
  date: { type: Date, default: Date.now},
  contact: { type: String, required: true},
});

module.exports = mongoose.model('Organization', organizationSchema);