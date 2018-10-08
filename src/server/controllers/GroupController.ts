import { Group } from '../models/Group';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /group/:id
 * retrieves the group using the given id
 */
export let getGroup = (req: Request, res: Response) => {

  getRepository(Group)
  .createQueryBuilder('groups')
  .leftJoinAndSelect('groups.users', 'users')
  .where('groups.id = :id', { id: req.params.id })
  .getMany().then(group => {
    res.send(group);
  }).catch(err => { console.log(err); });
};

/**
 * GET /search/group/:name
 * retrieves the group using the given name
 */
export let getGroupByName = (req: Request, res: Response) => {
  getRepository(Group).createQueryBuilder()
    .select()
    .where('name = :name', { name: req.param.name })
    .getMany().then(group => {
      res.send(group);
    }).catch(err => { console.log(err); });
};

/**
 * GET /groups/
 * retrieves the group using the given name
 */
export let getAllGroups = (req: Request, res: Response) => {
  getRepository(Group).createQueryBuilder()
    .select()
    .getMany().then(group => {
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
  getRepository(Group).update({ 'id': req.body.id }, req.body).then(updatedUser => {

    getRepository(Group).findByIds(req.body.id).then(group => {
      res.send(group);
    }).catch(err => { console.log(err); });

  }).catch(err => { console.log(err); });
};
