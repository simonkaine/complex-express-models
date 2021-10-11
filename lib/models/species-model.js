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

  static async getSpeciesById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM species WHERE id = $1', [id]
    );
    console.log('GET species by ID', rows);
    return new Species(rows[0]);
  }

  static async patchById(id, extinct, type) {
    const { rows } = await pool.query(
      `UPDATE species
      SET extinct = $2, type = $3
      WHERE id = $1
      RETURNING *`, 
      [id, extinct, type]
    );
    console.log('species PATCH', rows);
    return new Species(rows[0]);
  }

}
