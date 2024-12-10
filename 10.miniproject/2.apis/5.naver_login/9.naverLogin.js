require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const REDIRECT_URL = "http://localhost:3000/callback";

// 네이버 로그인 URL
const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize";
const NAVER_TOKEN_URL = "https://nid.naver.com/oauth2.0/token";

// 사용자의 개인정보를 조회하기 위한 URL
//( )
const NAVER_USERINFO_URL = "https://openapi.naver.com/v1/nid/me";

// 미들웨어
app.use(express.static("public"));

// 로그인 요청
app.get("/login", (req, res) => {
  // 네이버로 가라고 한다.
  const state = Math.random().toString(36).substring(7); // 36진수(0-9a-z) = 13자리 중 6자리만 사용

  console.log("state: ", state);

  // callback url 을 담아서 네이버에 보냄(다 끝나면 여기로 사용자 다시 보내세요)
  const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}&state=${state}`;

  console.log(authUrl);
  res.redirect(authUrl); // "여기 가서 확인하고 오세요" 라고, 네이버로 보냄.
});

app.get("/callback", async (req, res) => {
  // 인증 끝나고 돌아왔다
  // TOKEN을 기반으로 내가 할일을 한다
  // TOKEN 검증
  const { code, state } = req.query;
  const tokenResponse = await axios.get(NAVER_TOKEN_URL, {
    params: {
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_url: REDIRECT_URL,
      code: code,
      state: state,
    },
  });

  // 최종적으로 부여 받는게, 이 사용자용 accessToken임
  const accessToken = tokenResponse.data.access_token;

  // 사용자 정보 주세요
  const userInfoResponse = await axios.get(NAVER_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 가장 일반적인 규약임
    },
  });

  const userInfo = userInfoResponse.data.response;
  console.log("userInfo: ", userInfo);

  const additionalUserInfo = {
    nickname: userInfo.nickname || "미동의",
    gender: userInfo.gender || "미동의",
    name: userInfo.name || "미동의",
    email: userInfo.email || "미동의",
    age: userInfo.age || "미동의",
    birthyear: userInfo.birthyear || "미동의",
    birthday: userInfo.birthday || "미동의",
  };

  console.log("additionalUserInfo :", additionalUserInfo);

  // res.send(`로그인 성공: ${accessToken}`);

  // 확인용
  // res.send(`
  //   <h2>로그인 성공</h2>
  //   <p>닉네임: ${additionalUserInfo.nickname}</p>
  //   <p>이름: ${additionalUserInfo.name}</p>
  //   <p>이메일: ${additionalUserInfo.email}</p>
  //   <p>생일: ${additionalUserInfo.birthday}</p>
  //   `);

  // 현재) 세션이 없으니 정보 저장이 안되고, dashboard로 보낼 수 없음.

  // callback의 끝은 redirect로 dashboard로 보내는 것
  res.redirect("/dashboard");
  // 권한이 없는 사용자 처리 -> 미들웨어로
});

// 로그인 확인을 위한 미들웨어
function loggedIn(req, res, next) {
  if (req.session?.user) {
    // 에러 처리
    return next();
  } else {
    res.status(403).send("권한이 없다...");

    // 에러 페이지로 이동
    // res.status(403).sendFile(path.join(__dirname, "public", "error.html"));

    // 로그인 페이지로 이동
  }
}

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/api/user", (req, res) => {
  // 여기에서 사용자 정보를 반납
  res.json(); // 이거 채우기(세션으로)
});

app.get("/logout", (req, res) => {
  // 세션 삭제
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
