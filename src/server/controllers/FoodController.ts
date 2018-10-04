import { Food } from '../models/Food';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /food/:id
 * retrieves the food using the given id
 */
export let getFood = (req: Request, res: Response) => {
  getRepository(Food).findByIds(req.params.id).then(food => {
    res.send(food);
  }).catch(err => { console.log(err); });
};

/**
 * GET /foods
 * retrieves all the foods
 */
export let getFoodAll = (req: Request, res: Response) => {
  getRepository(Food).createQueryBuilder()
    .select()
    .getMany().then(foods => {
      res.send(foods);
    }).catch(err => { console.log(err); });
};
