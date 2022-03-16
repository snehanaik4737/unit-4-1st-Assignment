const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false},
    email: { type: String, required: true },
    // user: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user",
    // },
  
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
