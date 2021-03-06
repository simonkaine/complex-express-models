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

  .get('/', async (req, res, next) => {
    try {
      const savedAnimal = await Animals.getAllAnimalAndSpecies(req.body);
      res.send(savedAnimal);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/count', async (req, res, next) => {
    try {
      const getCount = await Animals.getCount(req.body);
      res.send(getCount);
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
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const deletedAnimal = await Animals.delete(req.params.id);
      res.send(deletedAnimal); 
    } catch (err) {
      next(err);
    }
  });


