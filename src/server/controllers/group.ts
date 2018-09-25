import { Group } from '../models/Group';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /group/:id
 * retrieves the group using the given id
 */
export let getGroup = (req: Request, res: Response) => {
  getRepository(Group).findByIds(req.params.id).then(group => {
    res.send(group);
  }).catch(err => { console.log(err); });
};


/**
 * POST /group
 * saves the group using the given model
 */
export let postGroup = (req: Request, res: Response) => {
  getRepository(Group).save(req.body).then(group => {
    res.send(group);
  }).catch(err => { console.log(err); });
};

/**
 * PUT /group
 * updates the group using the given model and id
 */
export let putGroup = (req: Request, res: Response) => {
  getRepository(Group).update({'id' : req.body.id}, req.body).then(updatedUser => {

    getRepository(Group).findByIds(req.body.id).then(group => {
      res.send(group);
    }).catch(err => { console.log(err); });

  }).catch(err => { console.log(err); });
};
