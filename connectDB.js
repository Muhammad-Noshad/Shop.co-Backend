const mongoose = require('mongoose');
let db;

async function connectDB(url){
  await mongoose.connect(url)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("MongoDB connection error!", err));
  db = mongoose.connection.db;
}

function getDB(){
  return db;
}

module.exports = {connectDB, getDB};