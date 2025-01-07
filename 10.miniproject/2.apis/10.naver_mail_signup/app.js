require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
// const axios = require("axios");
const randomstring = require("randomstring");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));

const transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: process.env.NAVER_EMAIL,
    pass: process.env.NAVER_PASSWORD,
  },
});

const database = {
  users: [],
  // 실제 DB를 써야함.
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// 인증 코드 생성 함수
function generateVerificationCode() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const verifyCode = generateVerificationCode();

  console.log(verifyCode);
  database.users.push({ email: email, code: verifyCode });

  const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: email,
    subject: "[새싹] 회원 가입 인증 코드", // 실제 제목
    // text: `회원가입 코드: ${verifyCode}`,
    html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #4CAF50;">서비스 가입을 환영합니다!</h2>
            <p>아래의 6자리 코드를 입력하여 인증을 완료해주세요:</p>
            <h1 style="color: #333; letter-spacing: 5px;">${verifyCode}</h1>
            <p>이 요청을 본인이 하지 않았다면, 이 메일을 무시하세요.</p>
        </div>`,
  };

  // 메일 발송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send(500).json({ message: "이메일 발송 중 오류가 발생했습니다." });
    } else {
      console.log("이메일 전송 성공: ", info.response);
      res.json({ message: "이메일로 인증코드가 발송되었습니다" });
    }
  });
});

// 사용자가 입력한 값과 인증 코드가 맞는지 검증하는 코드 필요
// {email, code}
app.post("/verify", (req, res) => {
  const { email, code } = req.body;
  console.log("email: ", email, "code: ", code);
  console.log("우리의 database: ", database);

  // TODO 여기에서 두 개 비교해서 사용자에게 응답 주기
  // 일치하는지 일치하지 않는지
  // 9번
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
});
