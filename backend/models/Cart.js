const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' // Assuming you have a User model
  },
  items: [{
    type: new mongoose.Schema({
      // Define the structure of an item based on your requirements
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }, // Example
      quantity: { type: Number, required: true }
    }, { _id: false })
  }]
});

module.exports = mongoose.model('Cart', cartSchema);
