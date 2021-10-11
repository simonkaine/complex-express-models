import { Router } from 'express';
import Species from '../models/species-model.js';


export default Router()
  .post('/', async (req, res, next) => {
    try {
      const speciesBody = req.body;
      const savedSpecies = await Species.insert(speciesBody);
      res.send(savedSpecies);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const order = await Species.getAllSpecies();
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  // make a get by id middleware in order to patch
  .get('/:id', async (req, res, next) => {
    try {
      const getSpecies = await Species.getSpeciesById(req.params.id);
      res.send(getSpecies);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const patchId = await Species.patchById(req.params.id, req.body.extinct, req.body.type);
      res.send(patchId);
    } catch (error) {
      next(error);
    }
  });



