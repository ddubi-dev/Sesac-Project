// (12/11/수) 수정 필요!!!

const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error("YOUTUBE_API_KEY는 필수 입력 사항입니다.");
  process.exit(1);
}

const searchUrlAPI = `https://www.googleapis.com/youtube/v3/search`;
const videoUrlAPI = `https://www.googleapis.com/youtube/v3/videos`;

const maxResultPerPage = 1;
const totalPages = 1;

// const maxResultPerPage = 10;
// const totalPages = 5;
// 10개씩 5번

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

      const table = [];
      for (let index = 0; index < searchResult.length; index++) {
        // searchResult.forEach(async (item) => {
        const item = searchResult[index];

        let title = item.snippet.title;
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const description = item.snippet.description;

        // 각각의 비디오 클립에 대해서 추가 정보 조회

        const videoParams = {
          part: "statistics",
          id: videoId,
          key: API_KEY,
        };

        // 타이틀이 너무 길어서 짤라보기
        const maxTitleLength = 30;
        if (title.length > maxTitleLength) {
          title = title.slice(0, maxResultPerPage) + "...";
        }

        const videoResponse = await axios.get(videoUrlAPI, { params: videoParams });
        const videoData = videoResponse.data;
        // const viewCount = videoData?.items?[0]?.statistics?.viewCount || "N/A";
        const viewCount = videoData.items[0]?.statistics?.viewCount || "N/A";

        console.log(viewCount);

        table.push({ Index: index + 1, Title: title, ViewCount: viewCount, VideoURL: videoUrl });
        break;

        // console.log("영상 제목: ", title);
        // console.log("영상 아이디: ", videoId);
        // console.log("Url 주소: ", videoUrl);
        // console.log("영상 설명: ", description);
        // console.log("====");
        // });
      }

      console.table(table);
    }
  } catch (error) {
    console.error("요청 실패: ", error.message);
  }
};

// fetchYoutube();

const fetchYoutube_parallel = async () => {
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
    }

    // Promise.all 을 통해서 전체를 병행 처리
    const table = await Promise.all(
      // 이거 안에서 처리한 게 모두 다 끝나면 종료가 됨.
      searchResult.map(async (item, index) => {
        let title = item.snippet.title;
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const description = item.snippet.description;

        // 각각의 비디오 클립에 대해서 추가 정보 조회

        const videoParams = {
          part: "statistics",
          id: videoId,
          key: API_KEY,
        };

        // 타이틀이 너무 길어서 짤라보기
        const maxTitleLength = 30;
        if (title.length > maxTitleLength) {
          title = title.slice(0, maxResultPerPage) + "...";
        }

        const videoResponse = await axios.get(videoUrlAPI, { params: videoParams });
        const videoData = videoResponse.data;
        const viewCount = videoData.items[0]?.statistics?.viewCount || "N/A";

        console.log(viewCount);

        return { Index: index + 1, Title: title, ViewCount: viewCount, VideoURL: videoUrl };
      })
    );
  } catch (error) {
    console.log("에러 : ", error);
  }
};

console.time("실행시간"); // 타이머 시작
async () => {
  // await fetchYoutube_parallel();
  await fetchYoutube();
  console.timeEnd("실행시간"); // 타이머 종료
};
