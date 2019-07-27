const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  startPrice: {
    type: Number,
    required: true
  },
  requirement: {
    type: String,
    required: true
  },
  sellable: {
    type: Boolean,
    required: true
  },
  production: {
    type: String,
    required: true
  },
  productiontime: {
    type: Number, // Time in minutes per 100m2
    required: true
  },
  productionquantity: {
    type: Number, // Quantity in minutes per m2
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  productlevel: {
    type: Number,
    required: true
  }
});

const Product = module.exports = mongoose.model('Product', productSchema);
