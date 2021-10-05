import pool from '../utils/pool.js';

export default class Animals {

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.nickname = row.nickname;
    this.typeId = row.type_id;
  }

  static async insert({ name, nickname, typeId}) {
    const { rows } = await pool.query(
      'INSERT INTO animals (name, nickname, type_id) VALUES ($1, $2, $3) RETURNING *',
      [name, nickname, typeId]
    );
    return new Animals(rows[0]);
  }

  static async getAllSpecies() {
    const { rows } = await pool.query(
      'SELECT * FROM animals',
    );
    return new Animals(rows[0]);
  }
}
