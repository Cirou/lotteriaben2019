"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var request = require("request");
var tf = require("@tensorflow/tfjs");
var GroupSuggestion_1 = require("../models/GroupSuggestion");
var DateUtils_1 = require("../../shared/utils/DateUtils");
var Location_1 = require("../models/Location");
exports.startLTDietDaemon = function () {
    console.log('LTDiet daemon - STARTED');
    // first run
    analyzePreferences();
    // register thread for repeated execution
    setInterval(analyzePreferences, 60000);
};
function analyzePreferences() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('LTDiet daemon - Analyzing users preferences');
            extractAllGroupsToAnalyze(function (groups) {
                groups.forEach(function (group) {
                    extractAllGroupsVotationsToAnalyze(group.id, function (votations) {
                        extractAllResturantsToAnalyze(function (resturants) {
                            console.log('LTDiet daemon - Analyzing group ' + group.id + ' preferences');
                            var inputMap = new Map;
                            resturants.forEach(function (resturant) {
                                var arr = Array(13).fill(0);
                                votations.forEach(function (foodvote) {
                                    var found = false;
                                    resturant.foods.forEach(function (cibo) {
                                        if (Number(foodvote.food_id) === Number(cibo.id)) {
                                            found = true;
                                        }
                                    });
                                    if (found) {
                                        arr[Number(foodvote.food_id)] = Number(foodvote.votations);
                                    }
                                });
                                inputMap.set(resturant.id, arr);
                            });
                            // console.log(inputMap);
                            tensorMath(group.id, inputMap);
                        });
                    });
                });
            });
            return [2 /*return*/];
        });
    });
}
function tensorMath(groupId, inputMap) {
    return __awaiter(this, void 0, void 0, function () {
        var votesMap, outputMap, totalVotesSum;
        return __generator(this, function (_a) {
            votesMap = new Map;
            outputMap = new Map;
            inputMap.forEach(function (votes, restaurantId) {
                var votesSum = 0;
                votes.forEach(function (vote) { votesSum += vote; });
                votesMap.set(restaurantId, tf.tensor(votesSum).asScalar());
            });
            totalVotesSum = tf.tensor(0);
            votesMap.forEach(function (votesSum, restaurantId) {
                // console.log('Totalsum = ' + totalVotesSum);
                totalVotesSum = totalVotesSum.add(votesSum);
            });
            votesMap.forEach(function (votesSum, restaurantId) {
                outputMap.set(restaurantId, quickMath(votesSum, totalVotesSum));
            });
            outputMap.forEach(function (percentage, restaurantId) {
                var sugg = new GroupSuggestion_1.GroupSuggestion();
                var loc = new Location_1.Location();
                loc.id = Number(restaurantId);
                sugg.group_id = groupId;
                sugg.location_id = loc;
                sugg.data = DateUtils_1.formatDate(new Date());
                var input = String(restaurantId + ' ' + new Date().toString());
                var output = '';
                for (var i = 0; i < input.length; i++) {
                    output += String(input[i].charCodeAt(0).toFixed(2));
                }
                var intOutput = Number.parseInt(output) / 100;
                var rating = percentage.valueOf();
                if (rating > 0) {
                    rating += intOutput;
                }
                sugg.rating = Number(rating.toFixed(2));
                saveSuggestions(sugg, function (resp) {
                    // console.log(resp);
                });
                // console.log(restaurantId + ' => ' + percentage.valueOf().toFixed(2) + ' %');
            });
            return [2 /*return*/];
        });
    });
}
function quickMath(x, sum) {
    var perc = tf.scalar(100);
    var xpercent = x.mul(perc);
    var num = (Math.random() * 1) + 1; // this will get a number between 1 and 2;
    num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1; // this will add minus sign in 50% of cases
    if (sum.asScalar().dataSync()[0] === 0) {
        return 0;
    }
    var result = xpercent.div(sum).asScalar().dataSync()[0];
    return result > 0 ? result : result;
}
function extractAllGroupsToAnalyze(callback) {
    var options = {
        host: 'localhost',
        port: '4200',
        path: '/groups/'
    };
    http.get(options, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            callback(JSON.parse(body));
        });
    });
}
function extractAllResturantsToAnalyze(callback) {
    var options = {
        host: 'localhost',
        port: '4200',
        path: '/locations/'
    };
    http.get(options, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            callback(JSON.parse(body));
        });
    });
}
function extractAllGroupsVotationsToAnalyze(groupId, callback) {
    var options = {
        host: 'localhost',
        port: '4200',
        path: '/groupvotations/' + groupId + '/' + DateUtils_1.formatDate(new Date)
    };
    http.get(options, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            callback(JSON.parse(body));
        });
    });
}
function saveSuggestions(input, callback) {
    var url = 'http://localhost:4200/groupsuggestion/';
    request.post(url, {
        json: input,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (error) {
            // callback(error, undefined);
        }
        else {
            // callback(error, response.body);
        }
    });
}
