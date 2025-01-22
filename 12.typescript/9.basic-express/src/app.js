"use strict";
// const express = require("express");
// 이거 X, import 로
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
app.get("/", function (req, res) {
    res.send("Hello, TypeScript");
});
app.get("/error", function (req, res) {
    throw new Error("그냥 오류...");
});
// 에러 처리용 미들웨어
app.use(function (err, req, res, next) {
    console.error("[\uC5D0\uB7EC]: ".concat(err.message));
    res.status(500).json({
        success: false,
        message: err.message,
    });
});
app.listen(port, function () {
    console.log("서버 레디");
});
