const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    user_id: { type: String, required: true, unique: true, lowercase: true },
    reg_time: { type: Date, default: Date.now },
    in_time: Date,
    out_time: Date
});

module.exports = mongoose.model("time", timeSchema);
