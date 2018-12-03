"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("../models/Location");
var typeorm_1 = require("typeorm");
/**
 * GET /location/:id
 * retrieves the location using the given id
 */
exports.getLocation = function (req, res) {
    typeorm_1.getRepository(Location_1.Location).findByIds(req.params.id).then(function (location) {
        res.send(location);
    }).catch(function (err) { console.log(err); });
};
/**
 * GET /locations
 * retrieves all the locations
 */
exports.getLocationAll = function (req, res) {
    typeorm_1.getRepository(Location_1.Location).find().then(function (locations) {
        res.send(locations);
    }).catch(function (err) { console.log(err); });
};
