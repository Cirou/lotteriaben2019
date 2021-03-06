import { getPremi, getPremiByPosizione, postPremi, putPremi, deletePremioById, getAllPremi, getAllPremiNoImages, getLastPremi, getPartialPremi } from './server/controllers/PremiController';
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
        path: '/premipartial/:start',
        method: 'get',
        action: getPartialPremi
    },
    {
        path: '/preminoimages',
        method: 'get',
        action: getAllPremiNoImages
    },
    {
        path: '/premilast',
        method: 'get',
        action: getLastPremi
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
