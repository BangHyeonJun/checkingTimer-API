module.exports = function(app, Time) {
    // GET ALL BOOKS
    app.get("/api/times", function(req, res) {
        Time.find(function(err, times) {
            if (err) return res.status(500).send({ error: "database failure" });
            res.json(times);
        });
    });

    // GET SINGLE BOOK
    app.get("/api/times/:book_id", function(req, res) {
        res.end();
    });

    // GET BOOK BY AUTHOR
    app.get("/api/times/author/:author", function(req, res) {
        res.end();
    });

    // CREATE BOOK
    app.post("/api/times", function(req, res) {
        var time = new Time();
        time.date = new Date(req.body.date);
        time.inTime = new Date(req.body.inTime);
        time.outTime = new Date(req.body.outTime);

        time.save(function(err) {
            if (err) {
                console.error(err);
                res.json({ result: 0 });
                return;
            }

            res.json({ result: 1 });
        });
    });

    // UPDATE THE BOOK
    app.put("/api/times/:time_id", function(req, res) {
        res.end();
    });

    // DELETE BOOK
    app.delete("/api/times/:book_id", function(req, res) {
        res.end();
    });
};
