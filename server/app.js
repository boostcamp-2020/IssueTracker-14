// express generator 에서 설정한 환경 변수
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");

// router
const apiRouter = require("./routes/index");

// 환경변수 설정
require("dotenv").config();

//passport
const passport = require("passport");
const passportConfig = require("./middlewares/passportConfig");

const app = express();

// 개발용으로 cors허용
app.use(
  require("cors")({
    origin: "http://127.0.0.1:8000",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
// 뭐하는 역할인지 확인.
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
passportConfig();

app.use("/api", apiRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server listening");
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// TODO: ERROR PAGE 만들고 handler 작성
