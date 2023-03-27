const express = require("express");
require("dotenv").config();
const main = require("./db");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.router");
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port${process.env.PORT}`);
});
