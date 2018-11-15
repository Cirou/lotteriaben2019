import { Votation } from '../models/Votation';
import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { formatDate } from '../../shared/utils/DateUtils';


/**
 * GET /votation/:id
 * retrieves the votation using the given id
 */
export let getVotation = (req: Request, res: Response) => {
  getRepository(Votation).createQueryBuilder('votations')
    .leftJoinAndSelect('votations.food_id', 'foods')
    .where('user_id = :id AND date = :date', { id: req.params.id, date: formatDate(new Date()) })
    .getMany().then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });
};

/**
 * GET /votation/:id/:date
 * retrieves the votation using the given id
 */
export let getVotationByDate = (req: Request, res: Response) => {
  getRepository(Votation).createQueryBuilder('votations')
    .leftJoinAndSelect('votations.food_id', 'foods')
    .where('user_id = :id AND date = :date', { id: req.params.id, date: req.params.date })
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

/**
 * GET /groupvotations/:id/:date
 * retrieves the votation using the given id
 */
export let getGroupVotationsByDate = (req: Request, res: Response) => {
  getConnection()
    .query('SELECT v.food_id, COUNT(v.food_id) as votations FROM groups AS g JOIN users_groups AS ug ON g.id == ug.groupsId JOIN users AS u ON u.id == ug.usersId JOIN votations AS v ON v.user_id == u.id WHERE g.id = :groupid AND v.date = :date GROUP BY v.food_id',
      [req.params.id, req.params.date])
    .then(groupVotation => {
      res.send(groupVotation);
    }).catch(err => { console.log(err); });
};
