require("dotenv").config();
const axios = require("axios");

const RESTAPI_KEY = process.env.KAKAO_REST_API_KEY;

const url = "https://dapi.kakao.com/v2/search/image";

const headers = {
  Authorization: `KakaoAK ${RESTAPI_KEY}`,
};

const query = "아이유";

const params = {
  query: query, // 필수
  sort: "accuracy", // 옵셔널
  page: 1, // 옵셔널
  size: 10, // 옵셔널
};

// 간편하게 프로미스 체이닝, 요즘은 async/await
// Promise 기반 체이닝... (ES6부터 도입...2015년도)
axios.get(url, { headers, params }).then((response) => {
  const data = response.data;
  console.log(data);
});
