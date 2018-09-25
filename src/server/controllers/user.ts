import { User } from '../models/User';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /user/:id
 * retrieves the user using the given id
 */
export let getUser = (req: Request, res: Response) => {
  getRepository(User).findByIds(req.params.id).then(user => {
    res.send(user);
  }).catch(err => { console.log(err); });
};


/**
 * POST /user
 * saves the user using the given model
 */
export let postUser = (req: Request, res: Response) => {
  getRepository(User).save(req.body).then(user => {
    res.send(user);
  }).catch(err => { console.log(err); });
};

/**
 * PUT /user
 * updates the user using the given model and id
 */
export let putUser = (req: Request, res: Response) => {
  getRepository(User).update({'id' : req.body.id}, req.body).then(updatedUser => {

    getRepository(User).findByIds(req.body.id).then(user => {
      res.send(user);
    }).catch(err => { console.log(err); });

  }).catch(err => { console.log(err); });
};
