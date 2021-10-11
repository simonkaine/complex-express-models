import pool from '../utils/pool.js';

export default class Animals {

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.nickname = row.nickname;
    this.typeId = row.type_id;
    this.type = row.type;
    this.count = row.count;
  }

  static async getCount() {
    const { rows } = await pool.query(
      'SELECT type, COUNT(*) AS count FROM animals INNER JOIN species ON animals.type_id = species.id GROUP BY species.type ORDER BY count, species.type'
    );
    console.log('ROWS >>>', rows);
    return rows.map((row) => new Animals(row));
  }

  static async getAllAnimalAndSpecies() {
    const { rows } = await pool.query(
      'SELECT animals.type_id, type, animals.name, animals.nickname FROM species INNER JOIN animals ON species.id = animals.type_id',
    );
    
    return rows.map((row) => new Animals(row));
  }

  static async insert({ name, nickname, typeId }) {
    const { rows } = await pool.query(
      'INSERT INTO animals (name, nickname, type_id) VALUES ($1, $2, $3) RETURNING *',
      [name, nickname, typeId]
    );
    return new Animals(rows[0]);
  }

  static async getAnimalById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM animals WHERE id = $1', 
      [id] 
    );
    return new Animals(rows[0]);
  }

  static async patchByID(id, name, nickname, typeId) {
    const { rows } = await pool.query(
      `UPDATE animals
       SET name = $2, nickname = $3, type_id = $4
       WHERE id = $1 
       RETURNING *;`,
      [id, name, nickname, typeId]
    );
    
    return new Animals(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
       FROM animals 
       WHERE id = $1 
       RETURNING *;`,
      [id]
    );
    return new Animals(rows);
  }
}


