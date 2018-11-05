import { getGroup, postGroup, putGroup, getGroupByName, getAllGroups } from './server/controllers/GroupController';
import { getUser, postUser, putUser, getUserByName, deleteUserGroup, postUserGroup, getAllUsers } from './server/controllers/UserController';
import { getTip, getTipMaxId } from './server/controllers/TipController';
import { getMessage, postMessage } from './server/controllers/MessageController';
import { getVotation, postVotation, putVotation, getVotationByDate } from './server/controllers/VotationController';
import { getFoodAll } from './server/controllers/FoodController';
import { getGroupSuggestion, getGroupSuggestionByDate, getUserSuggestion, getUserSuggestionByDate, getGroupSuggestionTSV } from './server/controllers/SuggestionController';

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
        path: '/users/',
        method: 'get',
        action: getAllUsers
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
        path: '/groups/',
        method: 'get',
        action: getAllGroups
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
        path: '/votation/:id/:date',
        method: 'get',
        action: getVotationByDate
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
    },
    {
        path: '/foods/',
        method: 'get',
        action: getFoodAll
    },
    {
        path: '/groupsuggestion/:id',
        method: 'get',
        action: getGroupSuggestion
    },
    {
        path: '/groupsuggestiontsv/:id/:date',
        method: 'get',
        action: getGroupSuggestionTSV
    },
    {
        path: '/groupsuggestion/:id/:date',
        method: 'get',
        action: getGroupSuggestionByDate
    },
    {
        path: '/usergroup',
        method: 'post',
        action: postUserGroup
    },
    {
        path: '/usergroup',
        method: 'put',
        action: deleteUserGroup
    },
    {
        path: '/usersuggestion/:id',
        method: 'get',
        action: getUserSuggestion
    },
    {
        path: '/usersuggestion/:id/:date',
        method: 'get',
        action: getUserSuggestionByDate
    },
];
