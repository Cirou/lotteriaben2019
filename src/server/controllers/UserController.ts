import { User } from '../models/User';
import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';


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
 * GET /users/
 * retrieves the group using the given name
 */
export let getAllUsers = (req: Request, res: Response) => {
  getRepository(User).find({ order:  { nome:  'ASC' } }).then(User => {
    res.send(User);
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

  const user: User = req.body;

  getConnection()
    .query('UPDATE users SET id = :id, name = :nome, surname = :cognome, email = :email, gender = :sesso, city = :citta, nickname = :nickname, image = :immagine WHERE id = :id',
      [user.id, user.nome, user.cognome, user.email, user.sesso, user.citta, user.nickname, user.immagine])
    .then(updatedUser => {
      getRepository(User).findByIds(req.body.id).then(user => {
        res.send(user);
      }).catch(err => { console.log(err); });
    }).catch(err => { console.log(err); });
};

/**
 * POST /usergroup
 * updates the user using the given model and id
 */
export let postUserGroup = (req: Request, res: Response) => {
  getConnection()
    .query('INSERT INTO users_groups VALUES (:userId, :groupId)', [req.body.userId, req.body.groupId])
    .then(user => {
      res.send({ result: 'OK' });
    }).catch(err => { console.log(err); });

};

/**
 * DELETE /usergroup
 * updates the user using the given model and id
 */
export let deleteUserGroup = (req: Request, res: Response) => {
  getConnection()
    .query('DELETE FROM users_groups WHERE usersId = :userId AND groupsId = :groupId', [req.body.userId, req.body.groupId])
    .then(user => {
      res.send({ result: 'OK' });
    }).catch(err => { console.log(err); });

};
