const Database = require("better-sqlite3");
const db = new Database("test.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        surname TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        salary INTEGER NOT NULL
    );
`);
