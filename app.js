// ENV
require("dotenv").config();

// 패키지 로드
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// 서버 포트 설정
const port = process.env.PORT || 8080;

// 스키마 정의
var Time = require("./models/schema");

// DB연결
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function() {
    // 연결되었음을 알림
    console.log("환영합니다. 몽고디비 입니다.");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to mongodb"))
    .catch(e => console.error(e));

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// 바디 파서를 사용하기 위한 앱 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static File Service
app.use(express.static("public"));

// 라우터 설정
const router = require("./routes")(app, Time);

// 서버 실행
const server = app.listen(port, function() {
    console.log(`Express server has started on port ${port}`);
});
