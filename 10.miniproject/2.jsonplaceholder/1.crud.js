const fetch = require("node-fetch");
// import fetch from "node-fetch";

async function fetchExample() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!response.ok) {
    console.log("에러");
    return;
  }

  const data = await response.json();
  console.log("가져온 데이터: ", data);
}

fetchExample();
