const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error("YOUTUBE_API_KEY는 필수 입력 사항입니다.");
  process.exit(1);
}

const url = `https://www.googleapis.com/youtube/v3/search`;
const params = {
  part: "snippet",
  q: "자바스크립트",
  type: "video",
  maxResults: 1,
  key: API_KEY,
};
// https://developers.google.com/youtube/v3/docs/search/list?hl=ko

const fetchYoutube = async () => {
  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    // console.log("받은 data: ", data);
    // console.log("items의 id: ", data.items[0].id);
    // console.log("snippet: ", data.items[0].snippet);

    data.items.forEach((item) => {
      const title = item.snippet.title; // 영상 제목
      const videoId = item.id.videoId; // 영상 아이디
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
      const description = item.snippet.description; // 영상 설명

      console.log("영상 제목: ", title);
      console.log("영상 아이디: ", videoId);
      console.log("Url 주소: ", videoUrl);
      console.log("영상 설명: ", description);
      console.log("====");
    });
  } catch (error) {
    console.error("요청 실패: ", error.message);
  }
};

fetchYoutube();
