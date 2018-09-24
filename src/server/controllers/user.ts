import { User } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /login
 * Login page.
 */
export let getUser = (req: Request, res: Response) => {
  getRepository(User).findOne().then(user => {
    res.send({ 'response': 'OK', 'user': user });
  }).catch(err => { console.log(err); });
};
