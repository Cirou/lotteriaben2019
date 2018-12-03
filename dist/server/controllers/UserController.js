"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var typeorm_1 = require("typeorm");
/**
 * GET /user/:id
 * retrieves the user using the given id
 */
exports.getUser = function (req, res) {
    typeorm_1.getRepository(User_1.User).findByIds(req.params.id).then(function (user) {
        res.send(user);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /users/
 * retrieves the group using the given name
 */
exports.getAllUsers = function (req, res) {
    typeorm_1.getRepository(User_1.User).find({ order: { nome: 'ASC' } }).then(function (User) {
        res.send(User);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /search/user/:name
 * retrieves the user using the given name
 */
exports.getUserByName = function (req, res) {
    typeorm_1.getRepository(User_1.User).createQueryBuilder()
        .select()
        .where('name = :name', { name: req.params.name })
        .getMany().then(function (user) {
        res.send(user);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /search/user/:id
 * retrieves the user using the given name
 */
exports.getUserByGroupId = function (req, res) {
    typeorm_1.getRepository(User_1.User).createQueryBuilder()
        .select()
        .where('name = :name', { name: req.params.id })
        .getMany().then(function (user) {
        res.send(user);
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /user
 * saves the user using the given model
 */
exports.postUser = function (req, res) {
    typeorm_1.getRepository(User_1.User).save(req.body).then(function (user) {
        res.send(user);
    }).catch(function (err) { console.log(err); });
};
/**
 * PUT /user
 * updates the user using the given model and id
 */
exports.putUser = function (req, res) {
    var user = req.body;
    typeorm_1.getConnection()
        .query('UPDATE users SET id = :id, name = :nome, surname = :cognome, email = :email, gender = :sesso, city = :citta, nickname = :nickname, image = :immagine WHERE id = :id', [user.id, user.nome, user.cognome, user.email, user.sesso, user.citta, user.nickname, user.immagine])
        .then(function (updatedUser) {
        typeorm_1.getRepository(User_1.User).findByIds(req.body.id).then(function (user) {
            res.send(user);
        }).catch(function (err) { console.log(err); });
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /usergroup
 * updates the user using the given model and id
 */
exports.postUserGroup = function (req, res) {
    typeorm_1.getConnection()
        .query('INSERT INTO users_groups VALUES (:userId, :groupId)', [req.body.userId, req.body.groupId])
        .then(function (user) {
        res.send({ result: 'OK' });
    }).catch(function (err) { console.log(err); });
};
/**
 * DELETE /usergroup
 * updates the user using the given model and id
 */
exports.deleteUserGroup = function (req, res) {
    typeorm_1.getConnection()
        .query('DELETE FROM users_groups WHERE usersId = :userId AND groupsId = :groupId', [req.body.userId, req.body.groupId])
        .then(function (user) {
        res.send({ result: 'OK' });
    }).catch(function (err) { console.log(err); });
};
