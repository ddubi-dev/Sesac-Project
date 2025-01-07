const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: process.env.NAVER_EMAIL,
    pass: process.env.NAVER_PASSWORD,
  },
});

const mailOptions = {
  // 과거에는 내 이메일 주소 아니어도 쓸 수 있음. 스팸 메일 때문에 변경됨.
  from: process.env.NAVER_EMAIL,
  to: process.env.GMAIL_EMAIL,
  subject: "테스트 이메일 발송", // 실제 제목
  text: "안녕하세요, 이것은 나의 네이버 메일에서 보낸 메일입니다~^^!!!",
};

// 메일 발송
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log("이메일 전송 성공: ", info.response);
  }
});
