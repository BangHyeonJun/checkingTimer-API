// 결과값을 위한 모델
let result_model = {
    message: "success",
    result: {},
    status_code: 200
};

// 공용함수 불러오기
const common = require("../common/common");

module.exports = function(app, Time) {
    app.get("/commute/initial", function(req, res) {
        console.log(req);
        Time.findOne(
            {
                user_id: req.headers.user_id
            },
            function(err, times) {
                let result = result_model;

                if (err) {
                    result.message = "database failure";
                    result.result = {};
                    result.status_code = 501;
                    return result;
                } else {
                    console.log(
                        common.unix_to_time("date", times.reg_time),
                        common.getDate("Date_now", null)
                    );
                    if (
                        common.unix_to_time("date", times.reg_time) ==
                        common.getDate("Date_now", null)
                    ) {
                        result.result = {
                            check_in_time: times.check_in_time,
                            check_out_time: times.check_out_time,
                            set_time_week: times.set_time_week,
                            spd_time_week: times.spd_time_week,
                            rmn_time_week: times.rmn_time_week,
                            in_time: common.unix_to_time(
                                "timestamp",
                                times.in_time
                            ),
                            out_time: common.unix_to_time(
                                "timestamp",
                                times.out_time
                            )
                        };
                    } else {
                        result.result = {
                            in_time: 0,
                            out_time: 0,
                            set_time_week: times.set_time_week,
                            spd_time_week: times.spd_time_week,
                            rmn_time_week: times.rmn_time_week,
                            check_in_time: false,
                            check_out_time: false
                        };
                    }
                }

                res.json(result);
            }
        ).sort({ reg_time: -1 });
    });

    app.get("/commute/timelist", function(req, res) {
        Time.find(
            {
                user_id: "2",
                reg_time: {
                    $gte: common.time_to_unix(
                        common.getDate("min_timestamp_now", null)
                    )
                }
            },
            function(err, times) {
                let result = result_model;

                if (err) {
                    result.message = "database failure";
                    result.result = {};
                    result.status_code = 502;
                    return result;
                } else {
                    result.result = times;
                }

                res.json(result);
            }
        ).sort({ reg_time: -1 });
    });

    app.post("/commute/timedata", function(req, res) {
        let time = new Time();
        // 실시간 데이터를 넣기 위해
        time.reg_time = common.time_to_unix(
            common.getDate("timestamp_now", null)
        );

        time.user_id = req.body.user_id;
        time.in_time = req.body.in_time;
        time.out_time = req.body.out_time;
        time.save(function(err) {
            if (err) {
                console.error(err);
                res.json({ result: 0 });
                return;
            }
            res.json({ result: 1 });
        });
    });

    app.post("/api/time", function(req, res) {
        res.end();
    });
};
