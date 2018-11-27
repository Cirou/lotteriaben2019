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
var User_1 = require("./User");
var Food_1 = require("./Food");
var UserSuggestion = /** @class */ (function () {
    function UserSuggestion() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], UserSuggestion.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, { eager: true }),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", Number)
    ], UserSuggestion.prototype, "user_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Food_1.Food; }, { eager: true }),
        typeorm_1.JoinColumn({ name: 'food_id' }),
        __metadata("design:type", Food_1.Food)
    ], UserSuggestion.prototype, "food_id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'date', type: 'date', nullable: true }),
        __metadata("design:type", Date)
    ], UserSuggestion.prototype, "data", void 0);
    __decorate([
        typeorm_1.Column({ name: 'recommended', type: 'boolean', nullable: true }),
        __metadata("design:type", Boolean)
    ], UserSuggestion.prototype, "recommended", void 0);
    UserSuggestion = __decorate([
        typeorm_1.Entity('suggestions_user')
    ], UserSuggestion);
    return UserSuggestion;
}());
exports.UserSuggestion = UserSuggestion;
