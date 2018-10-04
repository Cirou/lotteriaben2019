import { Message } from '../models/Message';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /message/:id
 * retrieves the message using the given group id
 */
export let getMessage = (req: Request, res: Response) => {
  getRepository(Message).createQueryBuilder()
    .select()
    .where('groupId = :id', { id: req.params.id })
    .getMany().then(messages => {
      res.send(messages);
    }).catch(err => { console.log(err); });
};



/**
 * POST /message
 * saves the message using the given model
 */
export let postMessage = (req: Request, res: Response) => {
  getRepository(Message).save(req.body).then(message => {
    res.send(message);
  }).catch(err => { console.log(err); });
};
