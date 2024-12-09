require("dotenv").config(); // .env 파일
const express = require("express");
const axios = require("axios"); // fetch
const morgan = require("morgan"); // 디버깅
const nunjucks = require("nunjucks"); // 템플릿엔진(서버사이드 렌더링)

const app = express();
const PORT = 3000;
const API_KEY = process.env.YOUTUBE_API_KEY;
const env = nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
// 눈적스 초기화

// 사용자 정의 필터를 추가
env.addFilter("stringify", function (obj) {
  return JSON.stringify(obj);
});

app.set("view engin", "html");

// 미들 웨어 설정
app.use(morgan("dev")); // 디버깅

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/search", async (req, res) => {
  // 여기에서 실제로 youtube 에서 검색해서 결과 반환

  const query = req.query.q;
  if (!query) {
    return res.status(400).send("입력 인자 없음");
    // 400: bad parameter
  }

  const maxResultPerPage = 10;

  const params = {
    part: "snippet",
    q: query,
    type: "video",
    maxResults: maxResultPerPage,
    key: API_KEY,
  };

  const url = `https://www.googleapis.com/youtube/v3/search`;

  try {
    // axios로 요청. 결과 목록을 이쁘게 json 으로 처리
    const response = await axios.get(url, { params });
    // 오류 처리 필요

    // raw 데이터
    // const videos = response.data.items;
    // res.render("index.html", { videos });

    // 필요한 데이터만 골라서 주기
    const videos = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default.url,
    }));

    res.render("index.html", { videos });
  } catch (error) {
    console.error("요청 오류: ", error);
    return res.status(500).send("알 수 없는 서버 오류");
  }
});

function decodeHtmlEntities(text) {
  const entities = {
    "&#39;": "'", // single quote
    "&quot;": '"', // double quote
    "&amp;": "&",
    "&lt;": "<",
    "$gt;": ">",
  };

  return text.replace(/&#39;|&quot;|&amp;|&lt;|$gt;/g, (match) => entities[match] || match);
}

app.get("/play", (req, res) => {
  const videoId = req.query.videoId;
  const videos = JSON.parse(decodeURIComponent(req.query.videos || "[]"));

  const selectedVideo = videos.find((video) => video.videoId === videoId);

  res.render("index", { videos, selectedVideo });
});

// 라우터
app.listen(PORT, () => {
  console.log("서버 레디");
});
