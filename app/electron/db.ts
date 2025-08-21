import { app } from 'electron';
import Database from 'better-sqlite3';
import path from 'node:path';

let db: Database.Database | null = null;

export function initDatabase() {
  const userData = app.getPath('userData');
  const dbPath = path.join(userData, 'notes.db');
  db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS notes(
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS tags(
      note_id INTEGER,
      tag TEXT,
      FOREIGN KEY(note_id) REFERENCES notes(id)
    );
    CREATE TABLE IF NOT EXISTS edges(
      src_id INTEGER,
      dst_id INTEGER,
      type TEXT,
      FOREIGN KEY(src_id) REFERENCES notes(id),
      FOREIGN KEY(dst_id) REFERENCES notes(id)
    );
    CREATE VIRTUAL TABLE IF NOT EXISTS fts_notes USING fts5(
      title, body, content='notes', content_rowid='id'
    );
  `);
  return db;
}

export function getDb() {
  return db ?? initDatabase();
}
