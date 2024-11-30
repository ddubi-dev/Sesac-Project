const express = require("express");
const sqlite3 = require("sqlite3");
const nunjucks = require("nunjucks");

const app = express();
const port = 3000;

// 눈적스 초기화
nunjucks.configure("views", {
  autoescape: true,
  // HTML을 자동으로 이스케이프 하도록 지정.
  express: app,
  // express 애플리케이션에 nunjucks 연결. 이를 통해 nunjucks 템플릿을 express의 응답처리에 사용 가능
});
// 템플릿 엔진 설정 함수
// views->템플릿 파일들이 저장된 디렉토리의 경로 지정
// nunjucks는 이 경로를 통해 템플릿 파일들을 찾아 렌더링

app.set("view engine", "njk");
// express에서 템플릿 엔진으로 눈적스를 사용하고, 파일 확장자를 .njk
// Express가 템플릿을 렌더링할 때, views 폴더 내의 .njk 파일을 사용

// app.set("view engine", "html"); // 눈적스 기본 확장자 njk -> html로 변경
// 기본적으로 Nunjucks 템플릿 엔진의 확장자를 .njk로 사용하지만, 확장자를 .html로 변경하려는 코드

app.get("/", (req, res) => {
  console.log("여기야");
  const db = new sqlite3.Database(`user_sample.db`, (err) => {
    if (err) {
      console.error("파일 없음");
    } else {
      console.log("DB 로딩 성공");
    }
  });

  db.all(
    `SELECT 
            strftime('%Y-%m', orders.OrderAt) AS YearMonth,
            SUM(items.UnitPrice) AS MonthlyRevenue, 
            COUNT(order_items.ItemId) AS ItemCount
        FROM 
            orders
        JOIN 
            order_items ON orders.Id = order_items.OrderId
        JOIN 
            items ON order_items.ItemId = items.Id
        WHERE 
            orders.OrderAt >= '2023-01-01' AND orders.OrderAt <= '2023-12-31'
        GROUP BY 
            strftime('%Y-%m', orders.OrderAt)
        ORDER BY 
            strftime('%Y-%m', orders.OrderAt)`,
    [],
    (err, rows) => {
      if (err) {
        console.error("쿼리 실패");
      } else {
        // console.log(rows);
        const labels = rows.map((row) => row.YearMonth);
        const revenues = rows.map((row) => row.MonthlyRevenue);
        // console.log(JSON.stringify(labels));
        // console.log(JSON.stringify(revenues));

        res.render("monthly_revenue", {
          rows,
          // labels: JSON.stringify(labels),
          // revenues: JSON.stringify(revenues),
        });
      }
    }
  );

  // 데이터베이스 연결 닫기
  db.close((err) => {
    if (err) {
      console.error("DB닫기 실패: ", err.message);
    } else {
      console.log("DB 닫기 성공");
    }
  });
});

app.listen(port, () => {
  console.log("서버 시작");
});
