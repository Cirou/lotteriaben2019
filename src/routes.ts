import { getGroup, postGroup, putGroup } from './server/controllers/group';
import { getUser, postUser, putUser } from './server/controllers/user';
import { getTip, getTipMaxId } from './server/controllers/tip';
import { getMessage, postMessage } from './server/controllers/message';
import { getVotation, postVotation, putVotation } from './server/controllers/votation';

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
    },
    {
        path: '/tip/:id',
        method: 'get',
        action: getTip
    },
    {
        path: '/tip/maxId',
        method: 'get',
        action: getTipMaxId
    },
    {
        path: '/message/:id',
        method: 'get',
        action: getMessage
    },
    {
        path: '/message',
        method: 'post',
        action: postMessage
    },
    {
        path: '/votation/:id',
        method: 'get',
        action: getVotation
    },
    {
        path: '/votation',
        method: 'post',
        action: postVotation
    },
    {
        path: '/votation',
        method: 'put',
        action: putVotation
    }
];
