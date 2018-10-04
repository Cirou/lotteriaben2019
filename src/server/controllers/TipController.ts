import { Tip } from '../models/Tip';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /tip/:id
 * retrieves the tip using the given id
 */
export let getTip = (req: Request, res: Response) => {
  getRepository(Tip).findByIds(req.params.id).then(tip => {
    res.send(tip);
  }).catch(err => { console.log(err); });
};

/**
 * GET /tip/maxId
 * retrieves the tip using the given id
 */
export let getTipMaxId = (req: Request, res: Response) => {
  getRepository(Tip).createQueryBuilder()
    .select('MAX(id)', 'id')
    .getRawOne().then(tip => {
      res.send(tip);
    }).catch(err => { console.log(err); });
};
