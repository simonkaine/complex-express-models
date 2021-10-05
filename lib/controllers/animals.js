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
      const order = await Animals.getAllAnimals();
      res.send(order);
    } catch (err) {
      next(err);
    }
  });
