const axios = require("axios");
const env = require("env");

require("dotenv").config();
// 변수 사용 안하니까
// 모듈 로딩해서 .env를 불러와서 메모리에 올림

const url = "https://api.openweathermap.org/data/2.5/weather";
const params = {
  q: "Seoul",
  appid: process.env.OPENWEATHER_API_KEY, // 조심!!! => env
  units: "metric", // 화씨가 섭씨로 바뀜
  lang: "kr",
};
// 하드코딩 말고 변수로

// axios.get(url, { params }).then((response) => {
//   console.log("응답: ", response.data);
// });

const fetchWeather = async () => {
  const response = await axios.get(url, { params });
  // console.log("응답: ", response.data);

  const weather = response.data;
  console.log(`도시: ${weather.name}`);
  console.log(`온도: ${weather.main.temp} C 섭씨`);
  console.log(`날씨: ${weather.weather[0].description}`);
};
// 예외처리 필요

fetchWeather();
