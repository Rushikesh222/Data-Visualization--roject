const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const UserAcc = require("./model/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const Port = 8000;
// const JWT_SECRET = "your_jwt_secret";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://shirsatrushikesh6:yAnROK5TfT5sD1Xj@rushikeshdb.hu0nd.mongodb.net/SuperAdmin?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

app.post("/signin", async (req, res, next) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const emailExists = await UserAcc.exists({ email });
    if (emailExists) {
      return next({ st: 406, ms: "Account with this email already exists" });
    }

    const createUser = await UserAcc.create({
      fullName,
      email,
      password,
      phone,
    });

    res.status(200).json({ data: { message: "Account is Created" } });
  } catch (error) {
    console.log(error);
    next({ st: 500, ms: error.message });
  }
});

app.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDetials = await UserAcc.findOne({ email });

    if (!userDetials) return next({ st: 400, ms: "Account Not Found.." });

    if (!(await bcrypt.compare(password, userDetials.password))) {
      log.loginStatus = "Failed";
      return next({ st: 400, ms: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: userDetials._id }, JWT_SECRET, {
      expiresIn: "4h",
    });

    res
      .status(200)
      .json({ data: { token: token, name: userDetials.fullName } });
  } catch (error) {
    console.log(error);
    next({ st: 500, ms: error.message });
  }
});

app.get("/", (req, res) => {
  res.json("hello");
});

// Start the server
module.exports = app;
