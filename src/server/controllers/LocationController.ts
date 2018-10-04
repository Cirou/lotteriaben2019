import { Location } from '../models/Location';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /location/:id
 * retrieves the location using the given id
 */
export let getLocation = (req: Request, res: Response) => {
  getRepository(Location).findByIds(req.params.id).then(location => {
    res.send(location);
  }).catch(err => { console.log(err); });
};

/**
 * GET /locations
 * retrieves all the locations
 */
export let getLocationAll = (req: Request, res: Response) => {
  getRepository(Location).createQueryBuilder()
    .select()
    .getMany().then(locations => {
      res.send(locations);
    }).catch(err => { console.log(err); });
};
