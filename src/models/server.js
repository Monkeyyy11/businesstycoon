const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  usercount: {
    type: Number,
    required: true
  }
});

const Server = module.exports = mongoose.model('Serverconfig', serverSchema);
