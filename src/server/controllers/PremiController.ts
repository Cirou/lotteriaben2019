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
        .getMany()
        .then(premi => {
            res.send(premi);
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * GET /premi/posizione/:id
 * retrieves the premi using the given id
 */
export let getPremiByPosizione = (req: Request, res: Response) => {
    getRepository(Premi)
        .createQueryBuilder('premi')
        .where('premi.posizione = :id', { id: req.params.id })
        .getMany()
        .then(premi => {
            res.send(premi);
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * GET /premi/
 * retrieves the premi using the given name
 */
export let getAllPremi = (req: Request, res: Response) => {
    getRepository(Premi)
        .createQueryBuilder('premi')
        .select()
        .orderBy('premi.posizione', 'ASC')
        .getMany()
        .then(premi => {
            res.send(premi);
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * GET /preminoimages
 * retrieves the premi using the given name
 */
export let getAllPremiNoImages = (req: Request, res: Response) => {
    getRepository(Premi)
        .createQueryBuilder('premi')
        .select(['premi.id', 'premi.posizione', 'premi.nomepremio', 'premi.descrizionepremio', 'premi.numerovincitore', 'premi.nomevincitore'])
        .orderBy('premi.posizione', 'ASC')
        .getMany()
        .then(premi => {
            res.send(premi);
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * GET /premipartial/:start
 * retrieves the premi using the given name
 */
export let getPartialPremi = (req: Request, res: Response) => {
    getRepository(Premi)
        .createQueryBuilder('premi')
        .limit(10).offset(req.params.start || 0)
        .select()
        .orderBy('premi.posizione', 'ASC')
        .getMany()
        .then(premi => {
            res.send(premi);
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * GET /premilast
 * retrieves the premi using the given name
 */
export let getLastPremi = (req: Request, res: Response) => {
    getRepository(Premi)
        .query('SELECT * FROM premi where numerovincitore is not null or nomevincitore is not null order by premi.posizione asc limit 3')
        .then(premi => {
            res.send(premi);
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * POST /premi
 * saves the premi using the given model
 */
export let postPremi = (req: Request, res: Response) => {
    getRepository(Premi)
        .save(req.body)
        .then(premi => {
            res.send(premi);
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * PUT /premi
 * updates the premi using the given model and id
 */
export let putPremi = (req: Request, res: Response) => {
    getRepository(Premi)
        .update({ id: req.body.id }, req.body)
        .then(updatedUser => {
            getRepository(Premi)
                .findByIds(req.body.id)
                .then(premi => {
                    res.send(premi);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * DELETE /premi/:id
 * retrieves the premi using the given id
 */
export let deletePremioById = (req: Request, res: Response) => {
    getRepository(Premi)
        .createQueryBuilder('premi')
        .delete()
        .where('premi.id = :id', { id: req.params.id })
        .execute()
        .then(premi => {
            res.send(premi);
        })
        .catch(err => {
            console.log(err);
        });
};
