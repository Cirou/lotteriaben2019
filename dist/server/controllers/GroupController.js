"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Group_1 = require("../models/Group");
var typeorm_1 = require("typeorm");
/**
 * GET /group/:id
 * retrieves the group using the given id
 */
exports.getGroup = function (req, res) {
    typeorm_1.getRepository(Group_1.Group)
        .createQueryBuilder('groups')
        .leftJoinAndSelect('groups.users', 'users')
        .where('groups.id = :id', { id: req.params.id })
        .getMany().then(function (group) {
        res.send(group);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /search/group/:name
 * retrieves the group using the given name
 */
exports.getGroupByName = function (req, res) {
    typeorm_1.getRepository(Group_1.Group).createQueryBuilder()
        .select()
        .where('name = :name', { name: req.param.name })
        .getMany().then(function (group) {
        res.send(group);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /groups/
 * retrieves the group using the given name
 */
exports.getAllGroups = function (req, res) {
    typeorm_1.getRepository(Group_1.Group).createQueryBuilder()
        .select()
        .getMany().then(function (group) {
        res.send(group);
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /group
 * saves the group using the given model
 */
exports.postGroup = function (req, res) {
    typeorm_1.getRepository(Group_1.Group).save(req.body).then(function (group) {
        res.send(group);
    }).catch(function (err) { console.log(err); });
};
/**
 * PUT /group
 * updates the group using the given model and id
 */
exports.putGroup = function (req, res) {
    typeorm_1.getRepository(Group_1.Group).update({ 'id': req.body.id }, req.body).then(function (updatedUser) {
        typeorm_1.getRepository(Group_1.Group).findByIds(req.body.id).then(function (group) {
            res.send(group);
        }).catch(function (err) { console.log(err); });
    }).catch(function (err) { console.log(err); });
};
