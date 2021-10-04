import { Router } from 'express';
import Species from '../models/species-model.js';


export default Router()
  .post('/', async (req, res, next) => {
    try {
      const speciesBody = req.body;
      const savedSpecies = await Species.insert(speciesBody);
      console.log('!!!!', savedSpecies);
      res.send(savedSpecies);
    } catch (error) {
      next(error);
    }
    
  });
