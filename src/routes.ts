import { getPremi, getPremiByPosizione, postPremi, putPremi, deletePremioById, getAllPremi } from './server/controllers/PremiController';

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
    }
];
