"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PremiController_1 = require("./server/controllers/PremiController");
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
        path: '/premi/',
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
    }
];
