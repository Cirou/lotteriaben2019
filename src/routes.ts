import { getUser } from './server/controllers/user';

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: '/user',
        method: 'get',
        action: getUser
    }
];
