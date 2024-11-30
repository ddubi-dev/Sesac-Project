const express = require("express");
const sqlite3 = require("sqlite3");
const nunjucks = require("nunjucks");

const app = express();
const port = 3000;

// 눈적스 초기화
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// app.set("view engine", "html"); // 눈적스 기본 확장자 njk -> html로 변경
app.set("view engine", "njk");

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
          labels: JSON.stringify(labels),
          revenues: JSON.stringify(revenues),
        });
      }

      // REST-API =>
      // 프론트엔드에서 1. 캔바스 크리기 2. 캔바스에 데이터를 넣고 바 그래프를 그린다 3. 넣을 데이터는? => 요청(fetch(), GET)
      // fetch(GET --->)
      //             <--- 응답의 형태, 데이터 포맷, JSON
      // 백엔드에서
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
