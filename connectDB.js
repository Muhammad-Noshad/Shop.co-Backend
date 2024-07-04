const mongoose = require('mongoose');

async function connectDB(url){
  await mongoose.connect(url)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("MongoDB connection error!", err));
}

module.exports = { connectDB };