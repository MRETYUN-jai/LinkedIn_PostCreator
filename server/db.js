const path = require('path');
const fs = require('fs');

let db;
let isPostgres = false;

if (process.env.DATABASE_URL) {
  // Use Postgres
  const { Pool } = require('pg');
  isPostgres = true;
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  console.log('✅ Connected to PostgreSQL cloud database.');
} else {
  // Use SQLite for local development
  const sqlite3 = require('sqlite3').verbose();
  const dbDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const dbPath = path.join(dbDir, 'database.sqlite');
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error connecting to local SQLite', err);
    else console.log('✅ Connected to local SQLite database.');
  });
}

// Convert SQLite '?' placeholders to Postgres '$1, $2'
const formatSql = (sql) => {
  if (!isPostgres) return sql;
  let i = 1;
  return sql.replace(/\?/g, () => `$${i++}`);
};

const initDb = async () => {
  if (isPostgres) {
    await db.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE,
      password_hash TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      type TEXT,
      content TEXT,
      hashtags TEXT,
      date TEXT,
      time TEXT,
      words INTEGER,
      imageNeeded BOOLEAN,
      imagePrompt TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
  } else {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password_hash TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        user_id INTEGER,
        type TEXT,
        content TEXT,
        hashtags TEXT,
        date TEXT,
        time TEXT,
        words INTEGER,
        imageNeeded BOOLEAN,
        imagePrompt TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`);
    });
  }
};

initDb();

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (isPostgres) {
      let pgSql = formatSql(sql);
      if (pgSql.trim().toUpperCase().startsWith('INSERT') && !pgSql.toUpperCase().includes('RETURNING')) {
        pgSql += ' RETURNING id';
      }
      db.query(pgSql, params)
        .then(res => resolve({ id: res.rows[0]?.id, changes: res.rowCount }))
        .catch(reject);
    } else {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    }
  });
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (isPostgres) {
      db.query(formatSql(sql), params)
        .then(res => resolve(res.rows[0]))
        .catch(reject);
    } else {
      db.get(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    }
  });
};

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (isPostgres) {
      db.query(formatSql(sql), params)
        .then(res => resolve(res.rows))
        .catch(reject);
    } else {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }
  });
};

module.exports = { db, run, get, all, isPostgres };
