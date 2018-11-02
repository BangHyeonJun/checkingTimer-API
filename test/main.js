// get express
const express = require("express");
const app = express();

// DB information
require("dotenv").config();
const db_url = process.env.DB_HOST;
const db_name = process.env.DB_NAME;
const db_port = process.env.DB_PORT;

// connect db
const mongoose = require("mongoose");
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function() {
    console.log("connect to mongod server");
});
mongoose.connect("mongodb://" + db_url + ":" + db_port + "/" + db_name);

// API port
const api_port = process.env.API_PORT || 8000;

// use body parser to use post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get Model
var Time = require("./models/time");

// API Module
const api = require("./modules")(app, Time);

// start API
var server = app.listen(api_port, function() {
    console.log(
        "start API ....",
        "\n",
        "DB : ",
        db_url + ":" + db_port,
        "\n",
        "DB NAME : ",
        db_name
    );
});
