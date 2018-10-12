"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../models/Message");
var typeorm_1 = require("typeorm");
/**
 * GET /message/:id
 * retrieves the message using the given group id
 */
exports.getMessage = function (req, res) {
    typeorm_1.getRepository(Message_1.Message)
        .createQueryBuilder('messages')
        .leftJoinAndSelect('messages.user', 'user')
        .where('groupId = :id', { id: req.params.id })
        .getMany().then(function (messages) {
        res.send(messages);
    }).catch(function (err) { console.log(err); });
};
/**
 * POST /message
 * saves the message using the given model
 */
exports.postMessage = function (req, res) {
    typeorm_1.getRepository(Message_1.Message).save(req.body).then(function (message) {
        res.send(message);
    }).catch(function (err) { console.log(err); });
};
