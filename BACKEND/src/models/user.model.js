import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
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
    select: false,
  },
  avatar: {
    type: String,
    required: false,
    default: function () {
      return getGravatarUrl(this.email);
    },
  },
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

function getGravatarUrl(email) {
  const hash = crypto
    .createHash("md5")
    .update(email.toLowerCase().trim())
    .digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?d=mp`;
}
const User = mongoose.model("User", userSchema);

export default User;
