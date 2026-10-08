const { Schema } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  funds: { type: Number, default: 100000 },
  usedMargin: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = { UserSchema };