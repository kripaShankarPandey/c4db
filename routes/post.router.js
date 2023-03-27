const express = require("express");
const jwt = require("jsonwebtoken");
const postRouter = express.Router();
const PostModel = require("../model/post.model");
const authMiddleware = require("../middleware/auth.middleware");
//posts get request
postRouter.get("/", authMiddleware, async (req, res) => {
  const { device, device1, device2, min, max } = req.query;

  try {
    if (device) {
      const data = await PostModel.find({
        user_id: req.body.user_id,
        device: device,
      });
      res.status(200).send(data);
    } else if (device1 && device2) {
      const data = await PostModel.find({
        $and: [
          { user_id: req.body.user_id },
          { device: device1 },
          { device: device2 },
        ],
      });
      res.status(200).send(data);
    } else if (min && max) {
      const data = await PostModel.find({
        $and: [
          { user_id: req.body.user_id },
          { no_of_comments: { $lt: max } },
          { no_of_comments: { $gt: min } },
        ],
      });
      res.status(200).send(data);
    } else {
      const data = await PostModel.find({
        user_id: req.body.user_id,
      });
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
//get posts/top data
postRouter.get("/top", authMiddleware, async (req, res) => {
  let { page } = req.query;
  page = +page;
  let skipdata = (page - 1) * 3;
  console.log(skipdata, "page");
  try {
    const data = await PostModel.find({ user_id: req.body.user_id })
      .sort({
        no_of_comments: -1,
      })
      .skip(skipdata)
      .limit(3);
    console.log(data, "page");
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "Can't get top Posts" });
  }
});
//posts add request
postRouter.post("/add", authMiddleware, async (req, res) => {
  try {
    const data = new PostModel(req.body);
    await data.save();
    res.status(200).send({ msg: "data added sucessfully" });
  } catch (error) {
    res.status(400).send({ msg: "data can't added sucessfully" });
  }
});
//posts delete request
postRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await PostModel.findByIdAndDelete({ _id: req.params.id });

    res.status(200).send({ msg: "data deleted  sucessfully" });
  } catch (error) {
    res.status(400).send({ msg: "data can't deleted  sucessfully" });
  }
});
//posts update request
postRouter.patch("/update/:id", authMiddleware, async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate({ _id: req.params.id }, { ...req.body });

    res.status(200).send({ msg: "data updated  sucessfully" });
  } catch (error) {
    res.status(400).send({ msg: "data can't updated  sucessfully" });
  }
});

module.exports = postRouter;
