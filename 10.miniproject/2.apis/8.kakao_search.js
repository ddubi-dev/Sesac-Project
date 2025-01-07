require("dotenv").config();
const axios = require("axios");

const RESTAPI_KEY = process.env.KAKAO_REST_API_KEY;

const url = "https://dapi.kakao.com/v2/search/web";

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
// axios.get(url, { headers, params }).then((response) => {
//   const data = response.data;
//   console.log(data);
// });

// Modern JS 방식
// async/wait 방식(ES8?? ES2017, ...??)
// const fetchFunction = async () => {
//   // try-catch !!!! 실무적으로 꼭 필수임.
//   const response = await axios.get(url, { headers, params });
//   const data = response.data;
//   console.log(data);
// };

// fetchFunction();

const params2 = {
  query: query, // 필수
  sort: "accuracy", // 옵셔널
  size: 10, // 옵셔널
};
// page는 옵셔널이라서 안 넣어도 됨.

const fetchFunctionPages = async (totalPages) => {
  // try-catch !!!! 실무적으로 꼭 필수임.
  try {
    for (let page = 1; page <= totalPages; page++) {
      params2.page = page;
      //   console.log(params2); // page로 제대로 들어감.
      const response = await axios.get(url, { headers, params: params2 });
      const data = response.data;
      console.log(data);
      // 총 30개가 나옴
    }
  } catch (error) {
    console.error(`에러 코드: ${error.response?.status}, ${error.message}`);
  }
};

fetchFunctionPages(3);
