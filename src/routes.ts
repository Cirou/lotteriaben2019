import { getPremi, postPremi, putPremi, getAllPremi } from './server/controllers/PremiController';

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
    }

];
