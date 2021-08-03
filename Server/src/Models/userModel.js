const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: /^01[0125][0-9]{8}$/,
      message: "please Enter Valid mobile number",
    },
  },
  dateofbirth: { type: Date },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
// isAdmin: { type: Boolean, default: false }
UserSchema.pre("save", async function (next) {
  //check new account or modified password
  if (!this.isModified("password")) {
    return next();
  }
  //Encrypt
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (e) {
    return next(e);
  }
});

module.exports = mongoose.model("User", UserSchema);
