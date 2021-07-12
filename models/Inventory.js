const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  item: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
  }

});





module.exports = mongoose.model('Inventory', inventorySchema);