const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ... aapka schema same rahega ...
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    // YEH LINE ADD KARO: Isse yeh 'user' collection hi use karega
    collection: 'user' 
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;