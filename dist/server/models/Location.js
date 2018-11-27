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
var Location = /** @class */ (function () {
    function Location() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Location.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'name', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Location.prototype, "nome", void 0);
    __decorate([
        typeorm_1.Column({ name: 'description', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Location.prototype, "descrizione", void 0);
    __decorate([
        typeorm_1.Column({ name: 'address', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Location.prototype, "indirizzo", void 0);
    __decorate([
        typeorm_1.Column({ name: 'email', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Location.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ name: 'phone_number', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Location.prototype, "tel_fisso", void 0);
    __decorate([
        typeorm_1.Column({ name: 'mobile_number', type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Location.prototype, "tel_mobile", void 0);
    __decorate([
        typeorm_1.Column({ name: 'position_x', type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Location.prototype, "posizione_x", void 0);
    __decorate([
        typeorm_1.Column({ name: 'position_y', type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Location.prototype, "posizione_y", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Food_1.Food; }, { eager: true }),
        typeorm_1.JoinTable({ name: 'locations_foods' }),
        __metadata("design:type", Array)
    ], Location.prototype, "foods", void 0);
    Location = __decorate([
        typeorm_1.Entity('locations')
    ], Location);
    return Location;
}());
exports.Location = Location;
