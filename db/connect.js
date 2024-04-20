const mongoose = require('mongoose');

// Suppress Mongoose deprecation warning
mongoose.set('strictQuery', false);

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
