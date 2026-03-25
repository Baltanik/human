import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../data/human.db');

let db;

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    migrate(db);
  }
  return db;
}

function migrate(db) {
  // ALTER TABLE statements that may fail on fresh DBs are run separately
  const safeAlter = (sql) => { try { db.exec(sql); } catch { /* column already exists */ } };

  db.exec(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY,
      gtm_id TEXT,
      ga4_id TEXT,
      google_ads_id TEXT,
      meta_pixel_id TEXT,
      calendly_url TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- Seed default empty row if not exists
    INSERT OR IGNORE INTO api_keys (id) VALUES (1);

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      website TEXT,
      budget TEXT,
      platforms TEXT,
      goals TEXT,
      source TEXT DEFAULT 'book-a-call',
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Idempotent column additions for existing databases
  safeAlter('ALTER TABLE api_keys ADD COLUMN calendly_url TEXT');
}
