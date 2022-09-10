import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name"],
    minlength: 3,
    maxlength: 25,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Provide your email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Provide a valid email",
    },
  },

  password: {
    type: String,
    required: [true, "Provide your password"],
    minlength: 6,
    select: false,
  },

  lastName: {
    type: String,
    maxlength: 25,
    trim: true,
    default: "lastName",
  },

  location: {
    type: String,
    maxlength: 25,
    trim: true,
    default: "my city",
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createMyJwt = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
