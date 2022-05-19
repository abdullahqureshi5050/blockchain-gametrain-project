const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    picture: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    walletAddress: { type: String, required: true },
  },
  //options
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
