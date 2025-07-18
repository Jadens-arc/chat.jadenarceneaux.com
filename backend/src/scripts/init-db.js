import { readFile } from 'fs/promises';
import path from 'path';
import { pool } from '../db.js';

async function runSQLFile(filePath) {
  const sql = await readFile(filePath, 'utf8');
  try {
    await pool.query(sql);
    console.log(`✅ Ran ${path.basename(filePath)}`);
  } catch (err) {
    console.error(`❌ Failed on ${filePath}:`, err.message);
    process.exit(1);
  }
}

async function main() {
  await runSQLFile(path.resolve('db/init.sql'));
  await pool.end();
}

main();
