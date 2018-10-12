"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupController_1 = require("./server/controllers/GroupController");
var UserController_1 = require("./server/controllers/UserController");
var TipController_1 = require("./server/controllers/TipController");
var MessageController_1 = require("./server/controllers/MessageController");
var VotationController_1 = require("./server/controllers/VotationController");
var FoodController_1 = require("./server/controllers/FoodController");
var SuggestionController_1 = require("./server/controllers/SuggestionController");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: '/user/:id',
        method: 'get',
        action: UserController_1.getUser
    },
    {
        path: '/users/',
        method: 'get',
        action: UserController_1.getAllUsers
    },
    {
        path: '/search/user/:name',
        method: 'get',
        action: UserController_1.getUserByName
    },
    {
        path: '/user',
        method: 'post',
        action: UserController_1.postUser
    },
    {
        path: '/user',
        method: 'put',
        action: UserController_1.putUser
    },
    {
        path: '/group/:id',
        method: 'get',
        action: GroupController_1.getGroup
    },
    {
        path: '/search/group/:name',
        method: 'get',
        action: GroupController_1.getGroupByName
    },
    {
        path: '/groups/',
        method: 'get',
        action: GroupController_1.getAllGroups
    },
    {
        path: '/group',
        method: 'post',
        action: GroupController_1.postGroup
    },
    {
        path: '/group',
        method: 'put',
        action: GroupController_1.putGroup
    },
    {
        path: '/tip/:id',
        method: 'get',
        action: TipController_1.getTip
    },
    {
        path: '/tipmaxid',
        method: 'get',
        action: TipController_1.getTipMaxId
    },
    {
        path: '/message/:id',
        method: 'get',
        action: MessageController_1.getMessage
    },
    {
        path: '/message',
        method: 'post',
        action: MessageController_1.postMessage
    },
    {
        path: '/votation/:id',
        method: 'get',
        action: VotationController_1.getVotation
    },
    {
        path: '/votation',
        method: 'post',
        action: VotationController_1.postVotation
    },
    {
        path: '/votation',
        method: 'put',
        action: VotationController_1.putVotation
    },
    {
        path: '/foods/',
        method: 'get',
        action: FoodController_1.getFoodAll
    },
    {
        path: '/suggestion/:id',
        method: 'get',
        action: SuggestionController_1.getSuggestion
    },
    {
        path: '/usergroup',
        method: 'post',
        action: UserController_1.postUserGroup
    },
    {
        path: '/usergroup',
        method: 'put',
        action: UserController_1.deleteUserGroup
    }
];