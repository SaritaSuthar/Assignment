const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;