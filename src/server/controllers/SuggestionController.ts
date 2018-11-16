import { GroupSuggestion } from '../models/GroupSuggestion';
import { Request, Response } from 'express';
import { getRepository, Connection, getConnection } from 'typeorm';
import { formatDate } from '../../shared/utils/DateUtils';
import { UserSuggestion } from '../models/UserSuggestion';

/**
 * GET /groupsuggestion/:id
 * retrieves the votation using the given id
 */
export let getGroupSuggestion = (req: Request, res: Response) => {
  getRepository(GroupSuggestion).createQueryBuilder('suggestions_group')
    .leftJoinAndSelect('suggestions_group.location_id', 'locations')
    .where('group_id = :id', { id: req.params.id })
    .getMany().then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });
};

/**
 * GET /groupsuggestiontsv/:id/:date
 * retrieves the votation using the given id
 */
export let getGroupSuggestionTSV = (req: Request, res: Response) => {
  getRepository(GroupSuggestion).createQueryBuilder('suggestions_group')
    .leftJoinAndSelect('suggestions_group.location_id', 'locations')
    .where('group_id = :id AND date = :date AND rating > 0', { id: req.params.id, date: req.params.date })
    .getMany().then(votation => {

      let resTSV = 'letter\tfrequency\r\n';

      votation.forEach(vote => {
        resTSV += vote.location_id.nome + '\t' + vote.rating + '\r\n';
      });

      res.send(resTSV);
    }).catch(err => { console.log(err); });
};

/**
 * GET /groupsuggestion/:id/:date
 * retrieves the votation using the given id
 */
export let getGroupSuggestionByDate = (req: Request, res: Response) => {
  getRepository(GroupSuggestion).createQueryBuilder('suggestions_group')
    .leftJoinAndSelect('suggestions_group.location_id', 'locations')
    .where('group_id = :id AND date = :date ORDER BY rating DESC', { id: req.params.id, date: req.params.date })
    .getMany().then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });
};

/**
 * POST /groupsuggestion
 * saves the suggestion using the given model
 */
export let postGroupSuggestion = (req: Request, res: Response) => {

  getRepository(GroupSuggestion).query(`
      INSERT INTO
            suggestions_group
        (
            "group_id",
            "location_id",
            "date",
            "rating"
        )
            VALUES
        (
            $1,
            $2,
            $3,
            $4
        )

        ON CONFLICT(
          "group_id",
          "location_id",
          "date" )
          DO UPDATE
              SET
                "rating" = $4
              WHERE
                "group_id" = $1
              AND
                "location_id" = $2
              AND
                "date" = $3

      `, [
      req.body.group_id,
      req.body.location_id.id,
      req.body.data,
      req.body.rating
    ]).then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });

};

/**
 * GET /usersuggestion/:id/
 * retrieves the votation using the given id
 */
export let getUserSuggestion = (req: Request, res: Response) => {
  getRepository(UserSuggestion).createQueryBuilder('suggestions_user')
    .leftJoinAndSelect('suggestions_user.food_id', 'foods')
    .where('user_id = :id', { id: req.params.id })
    .getMany().then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });
};

/**
 * GET /usersuggestion/:id/:date
 * retrieves the votation using the given id
 */
export let getUserSuggestionByDate = (req: Request, res: Response) => {
  getRepository(UserSuggestion).createQueryBuilder('suggestions_user')
    .leftJoinAndSelect('suggestions_user.food_id', 'foods')
    .where('user_id = :id AND date = :date', { id: req.params.id, date: req.params.date })
    .getMany().then(votation => {
      res.send(votation);
    }).catch(err => { console.log(err); });
};
