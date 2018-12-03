"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Votation_1 = require("../models/Votation");
var typeorm_1 = require("typeorm");
var DateUtils_1 = require("../../shared/utils/DateUtils");
/**
 * GET /votation/:id
 * retrieves the votation using the given id
 */
exports.getVotation = function (req, res) {
    typeorm_1.getRepository(Votation_1.Votation).createQueryBuilder('votations')
        .leftJoinAndSelect('votations.food_id', 'foods')
        .where('user_id = :id AND date = :date', { id: req.params.id, date: DateUtils_1.formatDate(new Date()) })
        .getMany().then(function (votation) {
        res.send(votation);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /votation/:id/:date
 * retrieves the votation using the given id
 */
exports.getVotationByDate = function (req, res) {
    typeorm_1.getRepository(Votation_1.Votation).createQueryBuilder('votations')
        .leftJoinAndSelect('votations.food_id', 'foods')
        .where('user_id = :id AND date = :date', { id: req.params.id, date: req.params.date })
        .getMany().then(function (votation) {
        res.send(votation);
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /votation
 * saves the votation using the given model
 */
exports.postVotation = function (req, res) {
    typeorm_1.getRepository(Votation_1.Votation)
        .createQueryBuilder()
        .insert()
        .into(Votation_1.Votation)
        .values(req.body)
        .execute().then(function (votation) {
        res.send(votation);
    }).catch(function (err) { console.log(err); });
};
/**
 * PUT /votation
 * updates the votation using the given model and id
 */
exports.putVotation = function (req, res) {
    typeorm_1.getRepository(Votation_1.Votation).update({ 'id': req.body.id, 'food_id': req.body.id }, req.body).then(function (updatedUser) {
        typeorm_1.getRepository(Votation_1.Votation).findByIds(req.body.id).then(function (votation) {
            res.send(votation);
        }).catch(function (err) { console.log(err); });
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /groupvotations/:id/:date
 * retrieves the votation using the given id
 */
exports.getGroupVotationsByDate = function (req, res) {
    typeorm_1.getConnection()
        .query('SELECT v.food_id, COUNT(v.food_id) as votations FROM groups AS g JOIN users_groups AS ug ON g.id == ug.groupsId JOIN users AS u ON u.id == ug.usersId JOIN votations AS v ON v.user_id == u.id WHERE g.id = :groupid AND v.date = :date GROUP BY v.food_id', [req.params.id, req.params.date])
        .then(function (groupVotation) {
        res.send(groupVotation);
    }).catch(function (err) { console.log(err); });
};
