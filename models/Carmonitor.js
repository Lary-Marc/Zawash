const mongoose = require('mongoose');

const carmonitorSchema = new mongoose.Schema({
 fullName: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  datetimeArrival: {
    type: Date,
    trim: true,
  },

  numberPlate: {
    type: String,
    trim: true,
  },
  carModel: {
    type: String,
    trim: true,
  },
  washer: {
    type: String,
    trim: true,
  },
  wage: {
    type: String,
    trim: true,
  },
  vehicle: {
    type: String,
    trim: true,
  },
  payment: {
    type: String,
    trim: true,
  }
});





module.exports = mongoose.model('Carmonitor', carmonitorSchema);