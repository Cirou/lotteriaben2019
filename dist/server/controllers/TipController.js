"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tip_1 = require("../models/Tip");
var typeorm_1 = require("typeorm");
/**
 * GET /tip/:id
 * retrieves the tip using the given id
 */
exports.getTip = function (req, res) {
    typeorm_1.getRepository(Tip_1.Tip).findByIds(req.params.id).then(function (tip) {
        res.send(tip);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /tip/maxId
 * retrieves the tip using the given id
 */
exports.getTipMaxId = function (req, res) {
    typeorm_1.getRepository(Tip_1.Tip).createQueryBuilder()
        .select('MAX(id)', 'id')
        .getRawOne().then(function (tip) {
        res.send(tip);
    }).catch(function (err) { console.log(err); });
};
