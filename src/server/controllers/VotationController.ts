import { Votation } from '../models/Votation';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /votation/:id
 * retrieves the votation using the given id
 */
export let getVotation = (req: Request, res: Response) => {
  getRepository(Votation).createQueryBuilder()
    .select()
    .where('group_id = :id', { name: req.params.id })
    .getMany().then(votation => {
      res.send(votation);
  }).catch(err => { console.log(err); });
};


/**
 * POST /votation
 * saves the votation using the given model
 */
export let postVotation = (req: Request, res: Response) => {
  getRepository(Votation).save(req.body).then(votation => {
    res.send(votation);
  }).catch(err => { console.log(err); });
};

/**
 * PUT /votation
 * updates the votation using the given model and id
 */
export let putVotation = (req: Request, res: Response) => {
  getRepository(Votation).update({'group_id' : req.body.id, 'location_id' : req.body.id}, req.body).then(updatedUser => {

    getRepository(Votation).findByIds(req.body.id).then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });

  }).catch(err => { console.log(err); });
};
