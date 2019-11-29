import { Premi } from '../models/Premi';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


/**
 * GET /premi/:id
 * retrieves the premi using the given id
 */
export let getPremi = (req: Request, res: Response) => {

  getRepository(Premi)
  .createQueryBuilder('premi')
  .where('premi.id = :id', { id: req.params.id })
  .getMany().then(premi => {
    res.send(premi);
  }).catch(err => { console.log(err); });
};

/**
 * GET /premi/posizione/:id
 * retrieves the premi using the given id
 */
export let getPremiByPosizione = (req: Request, res: Response) => {

  getRepository(Premi)
  .createQueryBuilder('premi')
  .where('premi.posizione = :id', { id: req.params.id })
  .getMany().then(premi => {
    res.send(premi);
  }).catch(err => { console.log(err); });

};

/**
 * GET /premi/
 * retrieves the premi using the given name
 */
export let getAllPremi = (req: Request, res: Response) => {
  getRepository(Premi).createQueryBuilder()
    .select()
    .getMany().then(premi => {
      res.send(premi);
    }).catch(err => { console.log(err); });
};


/**
 * POST /premi
 * saves the premi using the given model
 */
export let postPremi = (req: Request, res: Response) => {
  getRepository(Premi).save(req.body).then(premi => {
    res.send(premi);
  }).catch(err => { console.log(err); });
};

/**
 * PUT /premi
 * updates the premi using the given model and id
 */
export let putPremi = (req: Request, res: Response) => {
  getRepository(Premi).update({ 'id': req.body.id }, req.body).then(updatedUser => {

    getRepository(Premi).findByIds(req.body.id).then(premi => {
      res.send(premi);
    }).catch(err => { console.log(err); });

  }).catch(err => { console.log(err); });
};

/**
 * DELETE /premi/:id
 * retrieves the premi using the given id
 */
export let deletePremioById = (req: Request, res: Response) => {

  getRepository(Premi).
  createQueryBuilder('premi')
  .delete()
  .where('premi.id = :id', { id: req.params.id })
  .execute()
  .then(premi => {
    res.send(premi);
  }).catch(err => { console.log(err); });
};
