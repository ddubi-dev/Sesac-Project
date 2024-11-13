const { dbAllQuery, dbRunQuery } = require("./5.intro_library.js");

async function runDatabaseOperations() {
  try {
    await dbRunQuery("CREATE TABLE IF NOT EXISTS messages (text TEXT)");
    await dbRunQuery("INSERT INTO messages(text) VALUES (?)", ["Hello, SQLite"]);
    const rows = await dbAllQuery("SELECT * FROM messages");

    rows.forEach((row) => {
      console.log(row);
    });
  } catch (err) {
    console.error("에러: ", err);
  }
}

runDatabaseOperations();
