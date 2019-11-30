"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PremiController_1 = require("./server/controllers/PremiController");
var UserController_1 = require("./server/controllers/UserController");
var RaccoltaController_1 = require("./server/controllers/RaccoltaController");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: '/premi/:id',
        method: 'get',
        action: PremiController_1.getPremi
    },
    {
        path: '/premi/posizione/:id',
        method: 'get',
        action: PremiController_1.getPremiByPosizione
    },
    {
        path: '/premi',
        method: 'get',
        action: PremiController_1.getAllPremi
    },
    {
        path: '/premi',
        method: 'post',
        action: PremiController_1.postPremi
    },
    {
        path: '/premi',
        method: 'put',
        action: PremiController_1.putPremi
    },
    {
        path: '/premi/:id',
        method: 'delete',
        action: PremiController_1.deletePremioById
    },
    {
        path: '/user',
        method: 'post',
        action: UserController_1.postUser
    },
    {
        path: '/raccolta',
        method: 'get',
        action: RaccoltaController_1.getAllRaccolta
    },
    {
        path: '/raccolta',
        method: 'post',
        action: RaccoltaController_1.postRaccolta
    }
];
