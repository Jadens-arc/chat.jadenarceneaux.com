import { pool } from '../db.js';

export class User {
  constructor({ id, username, email, password }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async create({ username, email, password }) {
    const result = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [username, email, password]
    );
    return new User(result.rows[0]);
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    if (!result.rows[0]) return null;
    return new User(result.rows[0]);
  }

  static async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (!result.rows[0]) return null;
    return new User(result.rows[0]);
  }

  static async findByUsername(username) {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    if (!result.rows[0]) return null;
    return new User(result.rows[0]);
  }
  async save() {
    const result = await pool.query(
      `UPDATE users SET username = $1, email = $2, password = $3
       WHERE id = $4 RETURNING *`,
      [this.username, this.email, this.password, this.id]
    );
    Object.assign(this, result.rows[0]);
    return this;
  }

  async delete() {
    await pool.query(`DELETE FROM users WHERE id = $1`, [this.id]);
  }

  toJSON() {
    const { password, ...safeData } = this;
    return safeData; // hide password when converting to JSON
  }
}
