import pool from '../utils/pool.js';

export default class Species {

  constructor(row) {
    this.id = row.id;
    this.extinct = row.extinct;
    this.type = row.type;
  }

  static async insert({ extinct, type }) {
    const { rows } = await pool.query(
      'INSERT INTO species (extinct, type) VALUES ($1, $2) RETURNING *',
      [extinct, type]
    );
    return new Species(rows[0]);
  }

  static async getAllSpecies() {
    const { rows } = await pool.query(
      'SELECT * FROM species',
    );
    return new Species(rows[0]);
  }
}
