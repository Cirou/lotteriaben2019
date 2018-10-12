"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suggestion_1 = require("../models/Suggestion");
var typeorm_1 = require("typeorm");
var DateUtils_1 = require("../../shared/utils/DateUtils");
/**
 * GET /suggestion/:id
 * retrieves the votation using the given id
 */
exports.getSuggestion = function (req, res) {
    typeorm_1.getRepository(Suggestion_1.Suggestion).createQueryBuilder()
        .select()
        .where('group_id = :id AND date = :date', { id: req.params.id, date: DateUtils_1.formatDate(new Date()) })
        .getMany().then(function (suggestion) {
        res.send(suggestion);
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /suggestion
 * saves the suggestion using the given model
 */
exports.postSuggestion = function (req, res) {
    typeorm_1.getRepository(Suggestion_1.Suggestion).save(req.body).then(function (suggestion) {
        res.send(suggestion);
    }).catch(function (err) { console.log(err); });
};
