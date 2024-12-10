const fetch = require("node-fetch");
const axios = require("axios");
// import fetch from "node-fetch";

async function fetchExample() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!response.ok) {
      console.log("에러");
      return;
    }

    const data = await response.json();
    console.log("fetch 데이터: ", data.title);
  } catch (error) {
    console.log("fetch 통신 오류");
  }
}

async function axiosExample() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    // console.log("응답 코드: ", response.status);
    console.log("axios 데이터: ", response.data.title);
  } catch (error) {
    console.log("axios");
  }
}

// 동기화
// fetchExample();
// axiosExample();

// 비동기화
(async () => {
  await fetchExample();
  await axiosExample();
})();
