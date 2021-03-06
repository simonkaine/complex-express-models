import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const animal1 = {
    name: 'deer',
    nickname: 'sea deer',
    typeId: '1'
  };
  const animal2 = {
    name: 'elk',
    nickname: 'Giant deer',
    typeId: '1'
  };
  const animal3 = {
    name: 'moose',
    nickname: 'BIGGER MEANER elk',
    typeId: '1'
  };

  it('Should add/save a new Species', () => {
    const type = {
      extinct: false,
      type: 'mammal'
    };
    return request(app).post('/api/species').send(type)
      .then((res) => { expect(res.body).toEqual({
        ...type,
        id: '1'
      });
      });
  });

  it('Should GET all species', async () => {
    const species1 = {
      extinct: false,
      type: 'mammal'
    };
    await request(app).post('/api/species').send(species1);
    return request(app).get('/api/species')
      .then((res) => {
        expect(res.body).toEqual({
          ...species1,
          id: '1'
        });
      });
  });

  it('Should add/save a new animal', async () => {
    const species1 = {
      extinct: false,
      type: 'mammal'
    };

    const animal1 = {
      name: 'deer',
      nickname: 'sea deer',
      typeId: '1'
    };
    await request(app).post('/api/species').send(species1);
    return await request(app).post('/api/animals').send(animal1)
    
      .then((res) => { 
       
        expect(res.body).toEqual({
          ...animal1,
          id: '1'
        });
      });
  });

  it('Route to get an Animal by id', async () => {
    const species1 = {
      extinct: false,
      type: 'mammal'
    };

    const animal1 = {
      name: 'deer',
      nickname: 'sea deer',
      typeId: '1'
    };
    await request(app).post('/api/species').send(species1);
    await request(app).post('/api/animals').send(animal1);
    return request(app).get('/api/animals/1')
    
      .then((res) => { 
        expect(res.body).toEqual({
          ...animal1,
          id: '1'
        });
      });
  });

  it('Route to PATCH/update an Animal', async () => {
    const species1 = {
      extinct: false,
      type: 'mammal'
    };
    const animal1 = {
      name: 'deer',
      nickname: 'sea deer',
      typeId: '1'
    };
    const animal2 = {
      name: 'MORTAL KOMBAT',
      nickname: 'Sub Zero', 
      typeId: '1'
    };
    await request(app).post('/api/species').send(species1);
    await request(app).post('/api/animals').send(animal1);
    await request(app).patch('/api/animals/1').send(animal2);
    return request(app).get('/api/animals/1')
      .then(res => { 
        expect(res.body).toEqual({
          id: '1',
          name: 'MORTAL KOMBAT',
          nickname: 'Sub Zero', 
          typeId: '1'
        });
      });
  });

  it('should DELETE a animal by id', async () => {

    await request(app).post('/api/species').send({
      extinct: false,
      type: 'mammal'
    });
    await request(app).post('/api/animals').send({           
      name: 'MORTAL KOMBAT',
      nickname: 'Sub Zero', 
      typeId: '1'
    });
    return request(app)
      .delete('/api/animals/1')
      .then(res => {
        expect(res.body).toEqual({});
      });
  }); 

  it('Should GET all Animals and include their Species', async () => {
    const species1 = { 
      extinct: false,
      type: 'mammal'
    };
    await request(app).post('/api/species').send(species1);
    await request(app).post('/api/animals').send(animal1);
    await request(app).post('/api/animals').send(animal2);
    await request(app).post('/api/animals').send(animal3);

    return request(app).get('/api/animals')
      .then((res) => {
        expect(res.body).toEqual([
          { ...animal1, type: 'mammal', typeId: '1' }, 
          { ...animal2, type: 'mammal', typeId: '1' }, 
          { ...animal3, type: 'mammal', typeId: '1' }
        ]);
      });
  });

  it('Should get a count of Animals by Species', async () => {
    const species1 = { 
      extinct: false,
      type: 'mammal'
    };
    await request(app).post('/api/species').send(species1);
    await request(app).post('/api/animals').send(animal1);
    await request(app).post('/api/animals').send(animal2);
    await request(app).post('/api/animals').send(animal3);

    return request(app).get('/api/animals/count')// species or animals?
      .then((res) => {
        expect(res.body).toEqual([
          { type: 'mammal', count: '3' }
        ]);
      });
  });
 
  it('PATCH Route to set a Species to extinct (true or false)', async () => {
    const species1 = { 
      extinct: false,
      type: 'mammal'
    };
    await request(app).post('/api/species').send(species1);
    await request(app).patch('/api/species/1').send({  
      id: '1',
      extinct: true,
      type: 'mammal' 
    }); 
    return request(app).get('/api/species/1') 
      .then((res) => {
        expect(res.body).toEqual(
          { 
            id: '1',
            extinct: true,
            type: 'mammal' 
          }
        );
      });
  });

  afterAll(() => {
    pool.end();
  });
});
