// 모델을 만들기 위한 몽구스 패키지 및 한국 시간
const mongoose = require("mongoose");
const common = require("../common/common");
// 몽구스 스키마 가져 오기
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    user_id: { type: String, required: true, lowercase: true },
    reg_time: {
        type: Number,
        required: true
    },
    in_time: Number,
    check_in_time: {
        type: Boolean,
        default: false,
        required: true
    },
    out_time: Number,
    check_out_time: {
        type: Boolean,
        default: false,
        required: true
    },
    set_time_week: {
        type: String,
        default: "45",
        required: true
    },
    spd_time_week: {
        type: String,
        default: "0",
        required: true
    },
    rmn_time_week: {
        type: String,
        default: "45",
        required: true
    }
});

module.exports = mongoose.model("time", timeSchema);
