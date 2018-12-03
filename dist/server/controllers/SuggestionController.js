"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupSuggestion_1 = require("../models/GroupSuggestion");
var typeorm_1 = require("typeorm");
var UserSuggestion_1 = require("../models/UserSuggestion");
/**
 * GET /groupsuggestion/:id
 * retrieves the votation using the given id
 */
exports.getGroupSuggestion = function (req, res) {
    typeorm_1.getRepository(GroupSuggestion_1.GroupSuggestion).createQueryBuilder('suggestions_group')
        .leftJoinAndSelect('suggestions_group.location_id', 'locations')
        .where('group_id = :id', { id: req.params.id })
        .getMany().then(function (votation) {
        res.send(votation);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /groupsuggestiontsv/:id/:date
 * retrieves the votation using the given id
 */
exports.getGroupSuggestionTSV = function (req, res) {
    typeorm_1.getRepository(GroupSuggestion_1.GroupSuggestion).createQueryBuilder('suggestions_group')
        .leftJoinAndSelect('suggestions_group.location_id', 'locations')
        .where('group_id = :id AND date = :date AND rating > 0', { id: req.params.id, date: req.params.date })
        .getMany().then(function (votation) {
        var resTSV = 'letter\tfrequency\r\n';
        votation.forEach(function (vote) {
            resTSV += vote.location_id.nome + '\t' + vote.rating + '\r\n';
        });
        res.send(resTSV);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /groupsuggestion/:id/:date
 * retrieves the votation using the given id
 */
exports.getGroupSuggestionByDate = function (req, res) {
    typeorm_1.getRepository(GroupSuggestion_1.GroupSuggestion).createQueryBuilder('suggestions_group')
        .leftJoinAndSelect('suggestions_group.location_id', 'locations')
        .where('group_id = :id AND date = :date ORDER BY rating DESC', { id: req.params.id, date: req.params.date })
        .getMany().then(function (votation) {
        res.send(votation);
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /groupsuggestion
 * saves the suggestion using the given model
 */
exports.postGroupSuggestion = function (req, res) {
    typeorm_1.getRepository(GroupSuggestion_1.GroupSuggestion).query("\n      INSERT INTO\n            suggestions_group\n        (\n            \"group_id\",\n            \"location_id\",\n            \"date\",\n            \"rating\"\n        )\n            VALUES\n        (\n            $1,\n            $2,\n            $3,\n            $4\n        )\n\n        ON CONFLICT(\n          \"group_id\",\n          \"location_id\",\n          \"date\" )\n          DO UPDATE\n              SET\n                \"rating\" = $4\n              WHERE\n                \"group_id\" = $1\n              AND\n                \"location_id\" = $2\n              AND\n                \"date\" = $3\n\n      ", [
        req.body.group_id,
        req.body.location_id.id,
        req.body.data,
        req.body.rating
    ]).then(function (votation) {
        res.send(votation);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /usersuggestion/:id/
 * retrieves the votation using the given id
 */
exports.getUserSuggestion = function (req, res) {
    typeorm_1.getRepository(UserSuggestion_1.UserSuggestion).createQueryBuilder('suggestions_user')
        .leftJoinAndSelect('suggestions_user.food_id', 'foods')
        .where('user_id = :id', { id: req.params.id })
        .getMany().then(function (votation) {
        res.send(votation);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /usersuggestion/:id/:date
 * retrieves the votation using the given id
 */
exports.getUserSuggestionByDate = function (req, res) {
    typeorm_1.getRepository(UserSuggestion_1.UserSuggestion).createQueryBuilder('suggestions_user')
        .leftJoinAndSelect('suggestions_user.food_id', 'foods')
        .where('user_id = :id AND date = :date', { id: req.params.id, date: req.params.date })
        .getMany().then(function (votation) {
        res.send(votation);
    }).catch(function (err) { console.log(err); });
};
