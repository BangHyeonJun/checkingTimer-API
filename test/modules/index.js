module.exports = function(app, Time) {
    // Get all time about commuting
    app.get("/api/alltime", function(req, res) {
        let time = new Time();
        time.user_id = "1";
        time.in_time = new Date();
        time.out_time = new Date("2018/11/20");
        console.log(time);
        res.end();
    });

    app.post("/api/time", function(req, res) {
        console.log(req.body);
        res.end();
    });
};

/*
var now = new Date()
var now2 = new Date("2018/11/04")
var dif = Math.abs(now.getTime() - now2.getTime())
new Date(0, 0, 0, 0, 0, 0, dif)
var temp = new Date(0, 0, 0, 0, 0, 0, dif)
Math.floor(dif/ (1000 * 60 * 60 * 24))
*/
