// 현재 한국 날짜 시간 가져옴
exports.getDate = function(type, date) {
    let moment = require("moment");
    require("moment-timezone");
    moment.tz.setDefault("Asia/Seoul");
    let result = null;

    switch (type) {
        case "timestamp_now":
            result = moment().format("YYYY-MM-DD HH:mm:ss");
            break;
        case "min_timestamp_now":
            result = moment().format("YYYY-MM-DD 00:00:00");
            result = moment().format("2018-11-03 00:00:00");
            break;
        case "Date_now":
            result = moment().format("YYYY-MM-DD");
            break;
        default:
            result = moment().format("YYYY-MM-DD HH:mm:ss");
            break;
    }

    return result;
};

// 유닉스 시간으로 바꿈
exports.time_to_unix = function(time) {
    let reulst = 0;
    let mTime = new Date(time);

    reulst = mTime.getTime() / 1000;

    return reulst;
};

// 시간으로 바꿈
exports.unix_to_time = function(type, unixtime) {
    let data = unixtime;
    let result = 0;

    let timestamp = data * 1000;
    let date = new Date(timestamp);

    let re_year = date.getFullYear(); //year
    let re_month =
        date.getMonth() + 1 >= 10
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1); //month

    let re_day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate(); //day
    let re_hours =
        date.getHours() >= 10 ? date.getHours() : "0" + date.getHours(); //hour
    let re_min =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(); //minutes
    let re_seconde =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds(); //seconde

    let kor = [];
    let time = [];

    if (type == "timestamp") {
        kor = ["-", "-", " ", ":", ":", ""];
        time = [re_year, re_month, re_day, re_hours, re_min, re_seconde];
    } else if (type == "date") {
        kor = ["-", "-", ""];
        time = [re_year, re_month, re_day];
    } else if (type == "time") {
        kor = [":", ":", ""];
        time = [re_hours, re_min, re_seconde];
    }

    let result_kor = "";
    for (let i = 0; i <= kor.length - 1; i++) {
        result_kor += time[i] + kor[i];
    }

    result = result_kor;

    return result;
};
