const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: (p) => bcrypt.hashSync(p, 10),
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const UserAcc = mongoose.model("UserAccount", UserSchema);

module.exports = UserAcc;
