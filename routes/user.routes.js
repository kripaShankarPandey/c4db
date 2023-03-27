const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const UserModel = require("../model/user.model");
//register
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    const checkEmail = await UserModel.findOne({ email: email });
    if (checkEmail) {
      res.status(200).send({ msg: "User already exist" });
    } else {
      const hash = bcrypt.hashSync(password, 6);
      const newData = new UserModel({
        name,
        email,
        password: hash,
        gender,
        age,
        city,
        is_married,
      });
      await newData.save();
      res.status(200).send({ msg: "User registered Sucessfully" });
    }
  } catch (error) {
    res.status(400).send({ msg: "User not registered Sucessfully" });
  }
});
//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hash = await UserModel.findOne({ email });
  try {
    bcrypt.compare(password, hash.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ user_id: hash._id }, "masai");
        res.status(200).send({ msg: "User login Sucessfully", token });
      } else {
        res.status(400).send({ msg: "User not login Sucessfully" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: "User not login Sucessfully" });
  }
});
module.exports = userRouter;
