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
 * GET /search/user/:name
 * retrieves the user using the given name
 */
export let getUserByName = (req: Request, res: Response) => {
  getRepository(User).createQueryBuilder()
    .select()
    .where('name = :name', { name: req.params.name })
    .getMany().then(user => {
      res.send(user);
    }).catch(err => { console.log(err); });
};

/**
 * GET /search/user/:id
 * retrieves the user using the given name
 */
export let getUserByGroupId = (req: Request, res: Response) => {
  getRepository(User).createQueryBuilder()
    .select()
    .where('name = :name', { name: req.params.id })
    .getMany().then(user => {
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
  getRepository(User)
    .createQueryBuilder()
    .update()
    .set(req.body)
    .where('id = :id', { id: req.body.id })
    .execute()
    .then(updatedUser => {
      getRepository(User).findByIds(req.body.id).then(user => {
        res.send(user);
      }).catch(err => { console.log(err); });
    }).catch(err => { console.log(err); });
};
