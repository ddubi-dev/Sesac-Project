const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error("YOUTUBE_API_KEY는 필수 입력 사항입니다.");
  process.exit(1);
}

const searchUrlAPI = `https://www.googleapis.com/youtube/v3/search`;
const videoUrlAPI = `https://www.googleapis.com/youtube/v3/videos`;

const maxResultPerPage = 10;
const totalPages = 5;

const searchResult = []; // 검색 결과를 담을 곳

const fetchYoutube = async () => {
  let nextPageToken = null;

  try {
    for (let page = 1; page <= totalPages; page++) {
      const params = {
        part: "snippet",
        q: "자바스크립트",
        type: "video",
        maxResults: maxResultPerPage,
        pageToken: nextPageToken,
        key: API_KEY,
      };

      const response = await axios.get(searchUrlAPI, { params });
      const data = response.data;

      searchResult.push(...data.items);

      // 다음 페이지의 ID
      nextPageToken = data.nextPageToken;
      console.log("====== 다음 페이지{", nextPageToken, "} ======");

      for (let index = 0; index < searchResult.length; index++) {
        // searchResult.forEach(async (item) => {
        const item = searchResult[index];
        const title = item.snippet.title;
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const description = item.snippet.description;

        // 각각의 비디오 클립에 대해서 추가 정보 조회

        const videoParams = {
          part: "statistics",
          id: videoId,
          key: API_KEY,
        };
        const videoResponse = await axios.get(videoUrlAPI, { params: videoParams });
        console.log(videoResponse.data);
        break;

        // console.log("영상 제목: ", title);
        // console.log("영상 아이디: ", videoId);
        // console.log("Url 주소: ", videoUrl);
        // console.log("영상 설명: ", description);
        // console.log("====");
        // });
      }
    }
  } catch (error) {
    console.error("요청 실패: ", error.message);
  }
};

fetchYoutube();
