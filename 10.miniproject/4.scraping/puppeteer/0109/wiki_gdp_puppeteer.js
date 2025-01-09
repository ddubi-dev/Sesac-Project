// npm i puppeteer
const puppeteer = require("puppeteer");
// 원래 목적은 파싱X
// 브라우저 제어 기능
// 웹 브라우저 개발자도구에서 뭔가를 실행하는 기능

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)");

  const title = await page.title();
  console.log("페이지 제목: ", title);

  // 방법1. cheerio에 넣고 파싱한다.

  // 방법2. puppeteer의 문법으로 파싱한다.
  const countryData = await page.evaluate(() => {
    const rows = document.querySelectorAll("table.wikitable tr");
    const result = [];
    // 옛날 코딩 스타일
    rows.forEach((row) => {
      const columns = row.querySelectorAll("td");

      // 오류 처리
      if (columns.length > 2) {
        // 첫번째 열 데이터
        const country = columns[0].innerText.trim();
        // 두번째 열 데이터
        const gdp = columns[1].innerText.trim();
        result.push({ country, gdp });
      }
    });
    return result;
  });

  // 국가명을 기준으로 정렬 (현재는 GDP 순)
  countryData.sort((a, b) => a.country.localeCompare(b.country)); // -1, 0, 1
  console.log(countryData);

  console.log("------------------------------------");

  const countryData2 = await page.evaluate(() => {
    const rows = document.querySelectorAll("table.wikitable tr");
    return Array.from(rows)
      .map((row) => {
        const columns = row.querySelectorAll("td");
        return {
          country: columns[0]?.innerText.trim() || "N/A",
          gdp: columns[1]?.innerText.trim() || "N/A",
        }; // array에 넣고 하나씩 파싱
      })
      .filter((item) => item.country !== "N/A");
  });
  console.log(countryData2);

  await browser.close();
})();
