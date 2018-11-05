// 결과값을 위한 모델
let result_model = {
    message: "success",
    result: {},
    status_code: 200
};

// 공용함수 불러오기
const common = require("../common/common");

module.exports = function(app, Time) {
    // 가장 최근 데이터를 가져온다.
    // 수정 : 주에 따라 주가 안맞으면 데이터가 없도록 해야한다.
    app.get("/commute/initial", function(req, res) {
        Time.findOne(
            {
                user_id: req.headers.user_id
            },
            function(err, times) {
                let result = result_model;

                if (err || !times) {
                    result.message = "database failure";
                    result.result = {};
                    result.status_code = 501;
                } else {
                    // console.log(
                    //     common.unix_to_time("date", times.reg_time),
                    //     common.getDate("Date_now", null)
                    // );
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

    // 해당 아이디에 모든 출근 데이터를 가져온다.
    app.get("/commute/timelist", function(req, res) {
        Time.find(
            {
                user_id: req.headers.user_id,
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

    // 출근 데이터를 저장한다.
    // 수정 : 소모 시간과 남은 시간을 저장해야한다.
    app.post("/commute/intime", function(req, res) {
        let time = new Time();

        // 유저 아이디
        time.user_id = req.body.user_id;

        // 등록 날짜를 실시간으로 입력
        time.reg_time = common.time_to_unix(
            common.getDate("timestamp_now", null)
        );

        // 출근 시간
        time.in_time = req.body.in_time;

        // 퇴근시간이 없기 때문에 출근시간으로 입력
        time.out_time = req.body.in_time;

        // 출 퇴근 체크
        time.check_in_time = true;
        time.check_out_time = false;

        // 셋팅 시간을 가져온다.
        time.set_time_week = req.body.set_time_week;
        time.spd_time_week = req.body.spd_time_week;
        time.rmn_time_week = req.body.rmn_time_week;

        time.save(function(err) {
            if (err) {
                console.error(err);
                res.json({ result: 0 });
                return;
            }
            res.json({ result: 1 });
        });
    });

    // 퇴근 데이터를 저장한다.
    // 수정 : 소모 시간과 남은 시간을 저장해야한다.
    app.post("/commute/outtime", function(req, res) {
        let time = new Time();

        // 유저 아이디
        time.user_id = req.body.user_id;

        // 등록 날짜를 실시간으로 입력
        time.reg_time = common.time_to_unix(
            common.getDate("timestamp_now", null)
        );

        // 출근 시간
        time.in_time = req.body.in_time;

        // 퇴근시간이 없기 때문에 출근시간으로 입력
        time.out_time = req.body.out_time;

        // 출 퇴근 체크
        time.check_in_time = true;
        time.check_out_time = true;

        // 셋팅 시간을 가져온다.
        time.set_time_week = req.body.set_time_week;
        time.spd_time_week = req.body.spd_time_week;
        time.rmn_time_week = req.body.rmn_time_week;

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
