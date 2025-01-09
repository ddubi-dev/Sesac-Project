// npm i cheerio
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://news.naver.com/section/105";

axios
  .get(url)
  .then((response) => {
    // console.log(response.data);
    const $ = cheerio.load(response.data);
    const title = $("title").text();
    console.log("사이트 제목: ", title);

    const headlines = [];
    // 원하는 헤드라인 태그 가져오기
    // section_article as_headline _TEMPLATE
    // section_article _TEMPLATE
    const headlines_div = $("div.section_article.as_headline._TEMPLATE");
    $(headlines_div)
      .find("div.sa_text > a")
      .each((_, element) => {
        const title = $(element).text().trim();
        // console.log(title);
        headlines.push(title);
      });

    const headlines_div2 = $("div.section_article._TEMPLATE");
    $(headlines_div2)
      .find("div.sa_text > a")
      .each((_, element) => {
        const title = $(element).text().trim();
        // console.log(title);
        headlines.push(title);
      });

    console.log("헤드라인 출력 (Top5):");
    console.log(headlines);
  })
  .catch((error) => {
    console.error("요청에러:", error.status);
  });
