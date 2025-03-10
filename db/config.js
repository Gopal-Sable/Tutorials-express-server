import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default function openDb() {
    return open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });
}

export function createTable() {
    let tableSchema = `CREATE TABLE IF NOT EXISTS tutorials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        published INTEGER DEFAULT 0
    )`;

    return openDb().then((db) => db.run(tableSchema));
}
