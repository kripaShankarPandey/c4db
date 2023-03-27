require("dotenv").config();
const mongoose = require("mongoose");
const main = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Db connected sucessfully");
  } catch (error) {
    console.log("Db not connected sucessfully");
  }
};

main();
module.exports = main;
