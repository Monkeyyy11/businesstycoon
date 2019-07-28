const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  idOfUser: {
    type: Number,
    required: true
  },
  publishedDate: {
    type: Date,
    required: true
  }
});

const Advertisement = module.exports = mongoose.model('Advertisement', advertisementSchema);
