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

      const selectQuery = `
      SELECT Id AS id, OrderAt AS order_at, StoreId AS store_id, UserId AS user_id
      FROM orders 
      LIMIT ? 
      OFFSET ?`;
      // if (field == "Id") {
      //   th.textContent = "id";
      // } else if (field == "OrderAt") {
      //   th.textContent = "order_at";
      // } else if (field == "StoreId") {
      //   th.textContent = "store_id";
      // } else if (field == "UserId") {
      //   th.textContent = "user_id";
      // }

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

      const selectQuery = `SELECT Id AS id, OrderId AS order_id, ItemId AS item_id
      FROM order_items 
      LIMIT ? OFFSET ?`;

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

      const selectQuery = `
      SELECT Id AS id, Type AS type, Name as name, UnitPrice AS unit_price
      FROM items 
      LIMIT ? 
      OFFSET ?`;

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

      const selectQuery = `
      SELECT Id AS id, Type AS type, Name AS name, Address AS address
      FROM stores 
      LIMIT ? 
      OFFSET ?`;

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

app.get("/user_detail/:userId", (req, res) => {
  const userId = req.params.userId;
  res.sendFile(path.join(__dirname, "public", "user_detail.html"));
});

app.get("/user/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user_detail.html"));
});

app.get("/api/user/:id", (req, res) => {
  const userId = req.params.id;
  const selectQuery = `SELECT * FROM users WHERE Id = ?`;

  db.get(selectQuery, userId, (err, row) => {
    if (err) {
      // 에러 처리
    } else {
      res.status(200).json(row);
    }
  });
});

app.get("/api/user/:id/orderInfo", (req, res) => {
  const userId = req.params.id;
  const selectQuery = `SELECT orders.Id AS 'order id', orders.OrderAt AS 'purchased date', orders.StoreId AS 'purchased location'
  FROM orders
  JOIN users ON orders.UserId = users.Id
  WHERE orders.UserId = ?
  ORDER BY OrderAt`;

  db.all(selectQuery, userId, (err, rows) => {
    if (err) {
      //에러 처리
    } else {
      console.log("rows: ", rows);
      res.status(200).json(rows);
    }
  });
});

app.get("/orderItem/:orderId", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "orderItem_detail.html"));
});

app.get("/api/orderItem/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const selectQuery = `SELECT order_items.Id AS "id", order_items.OrderId AS "order_id",  order_items.ItemId AS "item_id", items.Name AS "item_name"
  FROM order_items
  JOIN items ON order_items.ItemId = items.Id
  WHERE order_items.OrderId = ?
  `;

  db.all(selectQuery, orderId, (err, rows) => {
    if (err) {
      //에러 처리
    } else {
      res.status(200).json(rows);
    }
  });

  // order_items.Id AS "id"
  // order_items.OrderId AS "order_id"
  // order_items.ItemId AS "item_id"
  // items.Name AS "item_name"
});

app.get("/order/:orderId", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "order_detail.html"));
});

app.get("/api/order/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const selectQuery = `
  SELECT orders.Id AS id, orders.OrderAt AS order_at, orders.StoreId AS store_id, orders.UserId AS user_id 
  FROM orders
  WHERE orders.Id = ?
  `;

  db.get(selectQuery, orderId, (err, rows) => {
    res.status(200).json(rows);
  });
});

app.get("/item/:itemId", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "item_detail.html"));
});

app.get("/api/item/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const selectQuery = `SELECT Name AS name, UnitPrice AS unit_price
  FROM items WHERE Id = ?`;

  db.get(selectQuery, itemId, (err, row) => {
    if (err) {
      // 에러 처리
    } else {
      res.status(200).json(row);
    }
  });
});

app.get("/api/item/month/:itemId", (req, res) => {
  console.log("여기야");
  const itemId = req.params.itemId;
  const selectQuery = `SELECT STRFTIME('%Y-%m', orders.OrderAt) AS Month, SUM(items.UnitPrice) AS 'Total Revenue', COUNT(*) AS 'Item Count'
  FROM items
  JOIN order_items ON items.Id = order_items.ItemId
  JOIN orders ON order_items.OrderId = orders.Id
  WHERE items.Id = ?
  GROUP BY STRFTIME('%Y-%m', orders.OrderAt)
  ORDER BY Month
  `;

  db.all(selectQuery, itemId, (err, row) => {
    if (err) {
      // 에러 처리
    } else {
      res.status(200).json(row);
    }
  });
});

app.get("/store/:storeId", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "store_detail.html"));
});

app.get("/api/store/:storeId", (req, res) => {
  const storeId = req.params.storeId;

  const selectQuery = `
  SELECT Name AS name, Type AS type, Address AS address
  FROM stores
  WHERE Id = ?
  `;

  db.get(selectQuery, storeId, (err, row) => {
    if (err) {
      // 에러 처리
    } else {
      res.status(200).json(row);
    }
  });
});

// store_detail.js 월별 상세 정보
app.get("/api/store/month/:storeId", (req, res) => {
  const storeId = req.params.storeId;
  const selectQuery = `
  SELECT STRFTIME('%Y-%m', orders.OrderAt) AS month, SUM(items.UnitPrice) AS revenue, COUNT(*) AS count
  FROM stores
  JOIN orders ON stores.Id = orders.StoreId
  JOIN order_items ON orders.Id = order_items.OrderId
  JOIN items ON order_items.ItemId = items.Id
  WHERE stores.Id = ?
  GROUP BY STRFTIME('%Y-%m', orders.OrderAt)
  ORDER BY month
  `;

  db.all(selectQuery, storeId, (err, rows) => {
    if (err) {
      // 에러 처리
    } else {
      res.status(200).json(rows);
    }
  });
});

// store의 월간 매출액 업데이트(상세)
app.get("/api/store/month/detail/:storeId", (req, res) => {
  const storeId = req.params.storeId;
  const date = req.query.date + "%";
  const selectQuery = `
  SELECT STRFTIME('%Y-%m-%d', orders.OrderAt) AS month, SUM(items.UnitPrice) AS revenue, COUNT(*) AS count
  FROM stores
  JOIN orders ON stores.Id = orders.StoreId
  JOIN order_items ON orders.Id = order_items.OrderId
  JOIN items ON order_items.ItemId = items.Id
  WHERE stores.Id = ? AND orders.OrderAt LIKE ?
  GROUP BY STRFTIME('%Y-%m-%d', orders.OrderAt)
  ORDER BY orders.OrderAt
  `;

  db.all(selectQuery, storeId, date, (err, rows) => {
    if (err) {
      //에러 처리
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get("/api/store/users/:storeId", (req, res) => {
  const storeId = req.params.storeId;
  const selectQuery = `SELECT users.Id AS user_id, users.Name AS name , COUNT(*) AS frequency
  FROM stores
  JOIN orders ON stores.Id = orders.StoreId
  JOIN users ON orders.UserId = users.Id
  WHERE stores.Id = ?
  GROUP BY orders.UserId
  ORDER BY frequency desc
  `;

  db.all(selectQuery, storeId, (err, rows) => {
    if (err) {
      // 에러 처리
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get("/api/store/users/detail/:storeId", (req, res) => {
  const storeId = req.params.storeId;
  const date = req.query.date + "%";
  const selectQuery = `SELECT users.Id AS user_id, users.Name AS name , COUNT(*) AS frequency
  FROM stores
  JOIN orders ON stores.Id = orders.StoreId
  JOIN users ON orders.UserId = users.Id
  WHERE stores.Id = ? AND orders.OrderAt LIKE ?
  GROUP BY  users.Id
  ORDER BY frequency desc
  `;

  db.all(selectQuery, storeId, date, (err, rows) => {
    if (err) {
      // 에러 처리
    } else {
      res.status(200).json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT} `);
});
