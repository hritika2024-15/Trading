const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    product: { type: String, default: "CNC" },
    name: { type: String, required: true },
    qty:  { type: Number, required: true },
    avg: { type: Number, required: true },
    price: { type: Number, required: true },
    net: { type: String, default: "+0.00%" },
    day: { type: String, default: "+0.00%" },
    isLoss: { type: Boolean, default: false },
});

module.exports = { PositionsSchema };