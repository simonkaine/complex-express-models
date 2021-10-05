import pool from '../utils/pool.js';

export default class Species {

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.typeId = row.type_id;
  }

  static async insert({ type, typeId }) {
    const { rows } = await pool.query(
      'INSERT INTO species (type, type_id) VALUES ($1, $2) RETURNING *',
      [type, typeId]
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
