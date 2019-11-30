"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Raccolta_1 = require("../models/Raccolta");
var typeorm_1 = require("typeorm");
/**
 * GET /raccolta/
 * retrieves the raccolta using the given name
 */
exports.getAllRaccolta = function (req, res) {
    typeorm_1.getRepository(Raccolta_1.Raccolta).createQueryBuilder()
        .select()
        .getMany().then(function (raccolta) {
        res.send(raccolta[0]);
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /raccolta
 * saves the raccolta using the given model
 */
exports.postRaccolta = function (req, res) {
    typeorm_1.getRepository(Raccolta_1.Raccolta).save(req.body).then(function (raccolta) {
        res.send(raccolta);
    }).catch(function (err) { console.log(err); });
};
