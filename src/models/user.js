const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: Number, 
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    unique: true
  },
  avatar: {
    type: String,
    required: true
  }
});

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

const User = module.exports = mongoose.model('User', userSchema);
