"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Group_1 = require("./Group");
var Location_1 = require("./Location");
var Suggestion = /** @class */ (function () {
    function Suggestion() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Suggestion.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Group_1.Group; }, { eager: true }),
        typeorm_1.JoinColumn({ name: 'group_id' }),
        __metadata("design:type", Number)
    ], Suggestion.prototype, "group_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Location_1.Location; }, { eager: true }),
        typeorm_1.JoinColumn({ name: 'location_id' }),
        __metadata("design:type", Number)
    ], Suggestion.prototype, "location_id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'date', type: 'date', nullable: true }),
        __metadata("design:type", Date)
    ], Suggestion.prototype, "data", void 0);
    Suggestion = __decorate([
        typeorm_1.Entity('suggestions')
    ], Suggestion);
    return Suggestion;
}());
exports.Suggestion = Suggestion;
