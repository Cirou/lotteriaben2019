import { Raccolta } from '../models/Raccolta';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

/**
 * GET /raccolta/
 * retrieves the raccolta using the given name
 */
export let getAllRaccolta = (req: Request, res: Response) => {
  getRepository(Raccolta).createQueryBuilder()
    .select()
    .getMany().then(raccolta => {
      res.send(raccolta[0]);
    }).catch(err => { console.log(err); });
};

/**
 * POST /raccolta
 * saves the raccolta using the given model
 */
export let postRaccolta = (req: Request, res: Response) => {
  getRepository(Raccolta).save(req.body).then(raccolta => {
    res.send(raccolta);
  }).catch(err => { console.log(err); });
};
