import { Router } from 'express';
import Animals from '../models/animals-model.js';


export default Router()
  .post('/', async (req, res, next) => {
    try {
      const animalBody = req.body;
      const savedAnimal = await Animals.insert(animalBody);
      res.send(savedAnimal);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const savedAnimalId = await Animals.getAnimalById(req.params.id);
      res.send(savedAnimalId);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedAnimal = await Animals.patchByID(req.params.id, req.body.name, req.body.nickname, req.body.typeId);
      res.send(updatedAnimal); 
    } catch (err) {
      next(err);
    }
  });
