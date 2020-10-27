import { Request, Response } from 'express';

/**
 * POST /user
 * saves the premi using the given model
 */
export let postUser = (req: Request, res: Response) => {
    if (req.body.pwd === 'LotteriaBeneficenza2020!') {
        res.send({ id: 'admin1', isValid: true });
    }
    res.send({ id: '', isValid: false });
};
