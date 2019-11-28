"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Premi_1 = require("../models/Premi");
var typeorm_1 = require("typeorm");
/**
 * GET /premi/:id
 * retrieves the premi using the given id
 */
exports.getPremi = function (req, res) {
    typeorm_1.getRepository(Premi_1.Premi)
        .createQueryBuilder('premi')
        .where('premi.id = :id', { id: req.params.id })
        .getMany().then(function (premi) {
        res.send(premi);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /premi/
 * retrieves the premi using the given name
 */
exports.getAllPremi = function (req, res) {
    typeorm_1.getRepository(Premi_1.Premi).createQueryBuilder()
        .select()
        .getMany().then(function (premi) {
        res.send(premi);
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /premi
 * saves the premi using the given model
 */
exports.postPremi = function (req, res) {
    typeorm_1.getRepository(Premi_1.Premi).save(req.body).then(function (premi) {
        res.send(premi);
    }).catch(function (err) { console.log(err); });
};
/**
 * PUT /premi
 * updates the premi using the given model and id
 */
exports.putPremi = function (req, res) {
    typeorm_1.getRepository(Premi_1.Premi).update({ 'id': req.body.id }, req.body).then(function (updatedUser) {
        typeorm_1.getRepository(Premi_1.Premi).findByIds(req.body.id).then(function (premi) {
            res.send(premi);
        }).catch(function (err) { console.log(err); });
    }).catch(function (err) { console.log(err); });
};
