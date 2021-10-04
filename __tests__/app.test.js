import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Should add/save a new Species', () => {
    const type = {
      type: 'mammal',
      typeId: null
    };

    return request(app).post('/api/species').send(type)
      .then((res) => { expect(res.body).toEqual({
        ...type,
        id: '1'
      });
      });
  });


  afterAll(() => {
    pool.end();
  });
});
