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
var Premi = /** @class */ (function () {
    function Premi() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Premi.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'posizione', type: 'integer' }),
        __metadata("design:type", Number)
    ], Premi.prototype, "posizione", void 0);
    __decorate([
        typeorm_1.Column({ name: 'nomepremio', type: 'varchar' }),
        __metadata("design:type", String)
    ], Premi.prototype, "nomepremio", void 0);
    __decorate([
        typeorm_1.Column({ name: 'descrizionepremio', type: 'varchar' }),
        __metadata("design:type", String)
    ], Premi.prototype, "descrizionepremio", void 0);
    __decorate([
        typeorm_1.Column({ name: 'immaginepremio', type: 'varchar' }),
        __metadata("design:type", String)
    ], Premi.prototype, "immaginepremio", void 0);
    __decorate([
        typeorm_1.Column({ name: 'immaginebase64', type: 'blob' }),
        __metadata("design:type", String)
    ], Premi.prototype, "immaginebase64", void 0);
    __decorate([
        typeorm_1.Column({ name: 'numerovincitore', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Premi.prototype, "numerovincitore", void 0);
    __decorate([
        typeorm_1.Column({ name: 'nomevincitore', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Premi.prototype, "nomevincitore", void 0);
    Premi = __decorate([
        typeorm_1.Entity('premi')
    ], Premi);
    return Premi;
}());
exports.Premi = Premi;
