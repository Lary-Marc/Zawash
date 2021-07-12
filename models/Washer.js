const mongoose = require('mongoose');

const washerSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  nin: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    trim: true,
  },

  gender: {
    type: String,
    trim: true,
  },

  telephone: {
    type: String,
    trim: true,
  },
  residence: {
    type: String,
    trim: true,
  },

  id: {
    type: String,
    trim: true,
  }


});





module.exports = mongoose.model('Washer', washerSchema);