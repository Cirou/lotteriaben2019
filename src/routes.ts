import { getGroup, postGroup, putGroup } from './server/controllers/group';
import { getUser, postUser, putUser } from './server/controllers/user';

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: '/user/:id',
        method: 'get',
        action: getUser
    },
    {
        path: '/user',
        method: 'post',
        action: postUser
    },
    {
        path: '/user',
        method: 'put',
        action: putUser
    },
    {
        path: '/group/:id',
        method: 'get',
        action: getGroup
    },
    {
        path: '/group',
        method: 'post',
        action: postGroup
    },
    {
        path: '/group',
        method: 'put',
        action: putGroup
    }
];
