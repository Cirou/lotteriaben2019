"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * POST /user
 * saves the premi using the given model
 */
exports.postUser = function (req, res) {
    if (req.body.pwd === 'p4ssw0rdL0tteri4!') {
        res.send({ id: 'admin1', isValid: true });
    }
    res.send({ id: '', isValid: false });
};
