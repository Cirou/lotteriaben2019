import { GroupSuggestion } from '../models/GroupSuggestion';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { formatDate } from '../../shared/utils/DateUtils';

/**
 * GET /groupsuggestion/:id
 * retrieves the votation using the given id
 */
export let getGroupSuggestion = (req: Request, res: Response) => {
  getRepository(GroupSuggestion).createQueryBuilder()
    .select()
    .where('group_id = :id AND date = :date', { id: req.params.id, date: formatDate(new Date()) })
    .getMany().then(suggestion => {
      res.send(suggestion);
  }).catch(err => { console.log(err); });
};

/**
 * GET /groupsuggestion/:id/:date
 * retrieves the votation using the given id
 */
export let getGroupSuggestionByDate = (req: Request, res: Response) => {
  getRepository(GroupSuggestion).createQueryBuilder('suggestions')
    .leftJoinAndSelect('votations.location_id', 'locations')
    .where('group_id = :id AND date = :date' , { id: req.params.id, date: req.params.date })
    .getMany().then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });
};

/**
 * POST /groupsuggestion
 * saves the suggestion using the given model
 */
export let postGroupSuggestion = (req: Request, res: Response) => {
  getRepository(GroupSuggestion).save(req.body).then(suggestion => {
    res.send(suggestion);
  }).catch(err => { console.log(err); });
};
