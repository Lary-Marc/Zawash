const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  item: {
    type: String,
    trim: true,
  },
  price: {
    type: Number
    
  },
  date: {
    type: Date,
    trim: true,
  }

});





module.exports = mongoose.model('Inventory', inventorySchema);