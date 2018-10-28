var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var timeSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    inTime: {
        type: Date,
        default: null
    },
    outTime: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model("Time", timeSchema);
