import { Votation } from '../models/Votation';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { formatDate } from '../../shared/utils/DateUtils';


/**
 * GET /votation/:id
 * retrieves the votation using the given id
 */
export let getVotation = (req: Request, res: Response) => {
  getRepository(Votation).createQueryBuilder()
    .select()
    .where('user_id = :id AND date = :date' , { name: req.params.id, date: formatDate(new Date()) })
    .getMany().then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });
};


/**
 * POST /votation
 * saves the votation using the given model
 */
export let postVotation = (req: Request, res: Response) => {

  getRepository(Votation)
    .createQueryBuilder()
    .insert()
    .into(Votation)
    .values(req.body)
    .execute().then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });

};

/**
 * PUT /votation
 * updates the votation using the given model and id
 */
export let putVotation = (req: Request, res: Response) => {
  getRepository(Votation).update({ 'id': req.body.id, 'food_id': req.body.id }, req.body).then(updatedUser => {

    getRepository(Votation).findByIds(req.body.id).then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });

  }).catch(err => { console.log(err); });
};
