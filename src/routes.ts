import { getPremi, getPremiByPosizione, postPremi, putPremi, deletePremioById, getAllPremi } from './server/controllers/PremiController';
import { postUser } from './server/controllers/UserController';
import { getAllRaccolta, postRaccolta } from './server/controllers/RaccoltaController';

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: '/premi/:id',
        method: 'get',
        action: getPremi
    },
    {
        path: '/premi/posizione/:id',
        method: 'get',
        action: getPremiByPosizione
    },
    {
        path: '/premi',
        method: 'get',
        action: getAllPremi
    },
    {
        path: '/premi',
        method: 'post',
        action: postPremi
    },
    {
        path: '/premi',
        method: 'put',
        action: putPremi
    },
    {
        path: '/premi/:id',
        method: 'delete',
        action: deletePremioById
    },
    {
        path: '/user',
        method: 'post',
        action: postUser
    },
    {
        path: '/raccolta',
        method: 'get',
        action: getAllRaccolta
    },
    {
        path: '/raccolta',
        method: 'post',
        action: postRaccolta
    }
];
