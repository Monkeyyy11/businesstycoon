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
  productionPrice: {
    type: Number,
    required: true
  },
  startPrice: {
    type: Number,
    required: true
  },
  requirement: {
    type: Number, // 1-100
    required: true
  },
  sellableToBots: {
    type: Boolean,
    required: true
  },
  production: {
    type: String,
    required: true
  },
  productiontime: {
    type: Number,
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
