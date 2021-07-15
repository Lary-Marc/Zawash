const mongoose = require('mongoose');

const carmonitorSchema = new mongoose.Schema({
 fullName: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    
  },
  phone: {
    type: String,
    trim: true,
  },
  datetimeArrival: {
    type: Date
    
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Washer",
  },
  
  Color: {
    type: String,
    trim: true,
  },
  package: {
    type: String,
    trim: true,
  },
  packagePrice: {
    type: Number,
  },
  washerFee: {
    type: Number,
  }


});





module.exports = mongoose.model('Carmonitor', carmonitorSchema);