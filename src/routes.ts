import { getGroup, postGroup, putGroup, getGroupByName } from './server/controllers/GroupController';
import { getUser, postUser, putUser, getUserByName } from './server/controllers/UserController';
import { getTip, getTipMaxId } from './server/controllers/TipController';
import { getMessage, postMessage } from './server/controllers/MessageController';
import { getVotation, postVotation, putVotation } from './server/controllers/VotationController';

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
        path: '/search/user/:name',
        method: 'get',
        action: getUserByName
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
        path: '/search/group/:name',
        method: 'get',
        action: getGroupByName
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
        path: '/tipmaxid',
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
