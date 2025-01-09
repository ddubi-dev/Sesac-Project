// npm i cheerio
const axios = require("axios");
const cheerio = require("cheerio");

const url = "http://www.cine21.com/rank/boxoffice/domestic";

axios
  .get(url)
  .then((response) => {
    // console.log(response.data);
    const $ = cheerio.load(response.data);
    $("script").remove(); // <script> 구문을 다 삭제
    console.log($.html());

    const title = $("title").text();
    console.log("사이트 제목: ", title);

    const boxofficeListContent = $("#boxoffice_list_content");
  })
  .catch((error) => {
    console.error("요청에러:", error.status);
  });
