const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("test.db");

function dbRunQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function dbAllQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

(async () => {
  try {
    await dbRunQuery("CREATE TABLE IF NOT EXISTS messages (text TEXT)");
    await dbRunQuery("INSERT INTO messages(text) VALUES (?)", ["Hello, SQLite"]);
    const rows = await dbAllQuery("SELECT * FROM messages");

    rows.forEach((row) => {
      console.log(row);
    });
  } catch (err) {
    console.error("에러: ", err);
  } finally {
    db.close();
  }
})();
