"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Food_1 = require("../models/Food");
var typeorm_1 = require("typeorm");
/**
 * GET /food/:id
 * retrieves the food using the given id
 */
exports.getFood = function (req, res) {
    typeorm_1.getRepository(Food_1.Food).findByIds(req.params.id).then(function (food) {
        res.send(food);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /foods
 * retrieves all the foods
 */
exports.getFoodAll = function (req, res) {
    typeorm_1.getRepository(Food_1.Food).createQueryBuilder()
        .select()
        .getMany().then(function (foods) {
        res.send(foods);
    }).catch(function (err) { console.log(err); });
};
