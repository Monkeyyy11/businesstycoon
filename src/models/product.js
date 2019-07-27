const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

const Product = module.exports = mongoose.model('Product', productSchema);
