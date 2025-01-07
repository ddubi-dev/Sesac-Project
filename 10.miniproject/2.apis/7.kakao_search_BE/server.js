require("dotenv").config();

const request = require("request");
const express = require("express");

const app = express();
const PORT = 3000;
const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;

app.use(express.static("public")); // 정적 파일 제공

app.get("/search/web", async (req, res) => {
  const api_url = "https://dapi.kakao.com/v2/search/web";
  const headers = {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  };

  const query = req.query.q;

  const params = {
    query: query, // 필수
    sort: "accuracy", // 옵셔널
    page: 1, // 옵셔널
    size: 10, // 옵셔널
  };

  axios.get(url, { headers, params }).then((response) => {
    const data = response.data;
    console.log("data: ", data);
    res.json(data);
  });
});

app.get("/search/img", (req, res) => {
  const api_url = "https://dapi.kakao.com/v2/search/image";
  const headers = {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  };
});

app.get("/search/video", (req, res) => {
  const api_url = "https://dapi.kakao.com/v2/search/vclip";
  const headers = {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  };
});

app.listen(PORT, () => {
  console.log(`서버 레디 on ${PORT}`);
});
