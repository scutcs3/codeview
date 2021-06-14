const fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
const dbFile = "config/codeview.db";
const tableFile = "config/table.sql";
let dbExist;

try {
  fs.accessSync(dbFile, fs.constants.R_OK);
  console.log("使用已有的SQLite数据库");
  dbExist = true;
} catch (error) {
  console.log("创建新的SQLite数据库");
  dbExist = false;
}
var DB = new sqlite3.Database(dbFile);
if (!dbExist) {
  let table_sql = fs.readFileSync(tableFile).toString();
  DB.exec(table_sql);
}

module.exports = DB;
