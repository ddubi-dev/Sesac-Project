// 라이브러리
require("dotenv").config(); //.env 파일 불러옴.
const { count } = require("console");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 변수
const db = new sqlite3.Database(process.env.DB_PATH);
const app = express();
const PORT = 3000;

// 미들웨어
app.use(express.static("public"));
app.use(myLogger);

function myLogger(req, res, next) {
  console.log(`LOG: ${req.method} ${req.url}`);
  next();
}

// 라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "order.html"));
});

app.get("/orderItem", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "orderItem.html"));
});

app.get("/item", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "item.html"));
});

app.get("/store", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "store.html"));
});

app.get("/api/users", (req, res) => {
  // pagination
  const { name, gender, page = 1 } = req.query;
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage; // 0:0~19, 1:20~39, ...
  let countSql = ``;
  const queryParams = [];

  if (name) {
    countSql = `SELECT COUNT(*) AS count  FROM users WHERE name = ? `;
    queryParams.push(name);
    if (gender) {
      countSql += `AND gender = ?`;
      queryParams.push(gender);
    }
  } else {
    countSql = `SELECT COUNT(*) AS count  FROM users `;
    if (gender) {
      countSql += `WHERE gender = ?`;
      queryParams.push(gender);
    }
  }

  // 동기화 처리
  db.get(countSql, queryParams, (err, row) => {
    if (err) {
      // 에러 처리
      res.status(500).json({ message: err.message });
      return;
    } else if (row.count == 0) {
      res.status(404).json({ message: "사용자 정보가 없습니다." });
      return;
    } else {
      const totalPage = Math.ceil(row.count / itemsPerPage);
      let selectQuery = ``;
      const queryParams2 = [itemsPerPage, offset];

      if (name) {
        selectQuery = `SELECT * FROM users WHERE name = ? Limit ? OFFSET ?`;
        if (gender) {
          selectQuery = `SELECT * FROM users WHERE name = ? AND gender = ? Limit ? OFFSET ?`;
          queryParams2.unshift(name, gender);
        } else {
          queryParams2.unshift(name);
        }
      } else {
        selectQuery = `SELECT * FROM users Limit ? OFFSET ?`;
        if (gender) {
          selectQuery = `SELECT * FROM users WHERE gender = ? Limit ? OFFSET ?`;
          queryParams2.unshift(gender);
        }
      }

      db.all(selectQuery, queryParams2, (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500);
          return;
        } else {
          res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
        }
      });
    }
  });
});

app.get("/api/orders", (req, res) => {
  // pagination
  const { page = 1 } = req.query;
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage; // 0:0~19, 1:20~39, ...
  let countSql = 0;

  const countQuery = `SELECT COUNT(*) AS count FROM orders`;

  db.get(countQuery, (err, row) => {
    if (err) {
      //
    } else {
      const totalPage = Math.ceil(row.count / itemsPerPage);

      const selectQuery = `SELECT * FROM orders LIMIT ? OFFSET ?`;

      db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
        if (err) {
          //
        } else {
          res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
        }
      });
    }
  });
});

app.get("/api/orderItems", (req, res) => {
  // pagination
  const { page = 1 } = req.query;
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage; // 0:0~19, 1:20~39, ...
  let countSql = 0;

  const countQuery = `SELECT COUNT(*) AS count FROM order_items`;

  db.get(countQuery, (err, row) => {
    if (err) {
      //
    } else {
      const totalPage = Math.ceil(row.count / itemsPerPage);

      const selectQuery = `SELECT * FROM order_items LIMIT ? OFFSET ?`;

      db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
        if (err) {
          //
        } else {
          res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
        }
      });
    }
  });
});

app.get("/api/items", (req, res) => {
  // pagination
  const { page = 1 } = req.query;
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage; // 0:0~19, 1:20~39, ...
  let countSql = 0;

  const countQuery = `SELECT COUNT(*) AS count FROM items`;

  db.get(countQuery, (err, row) => {
    if (err) {
      //
    } else {
      const totalPage = Math.ceil(row.count / itemsPerPage);

      const selectQuery = `SELECT * FROM items LIMIT ? OFFSET ?`;

      db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
        if (err) {
          //
        } else {
          res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
        }
      });
    }
  });
});

app.get("/api/stores", (req, res) => {
  // pagination
  const { page = 1 } = req.query;
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage; // 0:0~19, 1:20~39, ...
  let countSql = 0;

  const countQuery = `SELECT COUNT(*) AS count FROM stores`;

  db.get(countQuery, (err, row) => {
    if (err) {
      //
    } else {
      const totalPage = Math.ceil(row.count / itemsPerPage);

      const selectQuery = `SELECT * FROM stores LIMIT ? OFFSET ?`;

      db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
        if (err) {
          //
        } else {
          res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT} `);
});
