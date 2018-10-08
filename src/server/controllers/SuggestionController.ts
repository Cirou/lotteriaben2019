import { Suggestion } from '../models/Suggestion';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { formatDate } from '../../shared/utils/DateUtils';

/**
 * GET /suggestion/:id
 * retrieves the votation using the given id
 */
export let getSuggestion = (req: Request, res: Response) => {
  getRepository(Suggestion).createQueryBuilder()
    .select()
    .where('group_id = :id AND date = :date', { id: req.params.id, date: formatDate(new Date()) })
    .getMany().then(suggestion => {
      res.send(suggestion);
  }).catch(err => { console.log(err); });
};

/**
 * POST /suggestion
 * saves the suggestion using the given model
 */
export let postSuggestion = (req: Request, res: Response) => {
  getRepository(Suggestion).save(req.body).then(suggestion => {
    res.send(suggestion);
  }).catch(err => { console.log(err); });
};
