// npm i cheerio puppeteer
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { ChromeLauncher } = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true }); // 브라우저 안 뜨게
  // const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)");

  const title = await page.title();
  console.log("페이지 제목: ", title);

  // 방법1. cheerio에 넣고 파싱한다.
  const content = await page.content();
  const $ = cheerio.load(content);
  //   console.log($.html());

  const countryData = [];
  const tableRows = $("table.wikitable").find("tr");
  tableRows.each((index, element) => {
    const columns = $(element).find("td");
    const country = $(columns[0]).text().trim();
    const gdp = $(columns[1]).text().trim();

    // console.log(`${index + 1}: 국가: ${country}, GDP: ${gdp}`);
    if (country && gdp) {
      countryData.push({ country, gdp });
    }
  });

  // console.log(countryData);

  // 누락 값 없이 출력
  countryData.forEach((item, index) => {
    // GDP가 10000~20000 사이인 국가만 출력
    const gdpValue = parseInt(item.gdp.replace(/,/g, "")); // g: 글로벌
    if (gdpValue >= 10000 && gdpValue <= 20000) {
      console.log(`${index + 1}: 국가: ${item.country}, GDP: ${item.gdp}`);
    }
  });

  // GDP가 10000~20000 사이인 국가만 출력
  const filteredCountryData = countryData.filter((item) => {
    const gdpValue = parseInt(item.gdp.replace(/,/g, ""));
    return gdpValue >= 10000 && gdpValue < -20000;
  });

  console.log(filteredCountryData);

  await browser.close();
})();
