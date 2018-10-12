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
var Food_1 = require("./Food");
var Group_1 = require("./Group");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'name', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "nome", void 0);
    __decorate([
        typeorm_1.Column({ name: 'surname', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "cognome", void 0);
    __decorate([
        typeorm_1.Column({ name: 'email', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ name: 'gender', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "sesso", void 0);
    __decorate([
        typeorm_1.Column({ name: 'city', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "citta", void 0);
    __decorate([
        typeorm_1.Column({ name: 'nickname', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "nickname", void 0);
    __decorate([
        typeorm_1.Column({ name: 'image', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "immagine", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Food_1.Food; }, { eager: true }),
        typeorm_1.JoinTable({ name: 'users_foods' }),
        __metadata("design:type", Array)
    ], User.prototype, "foods", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Group_1.Group; }, { eager: true }),
        typeorm_1.JoinTable({ name: 'users_groups' }),
        __metadata("design:type", Array)
    ], User.prototype, "groups", void 0);
    User = __decorate([
        typeorm_1.Entity('users')
    ], User);
    return User;
}());
exports.User = User;
