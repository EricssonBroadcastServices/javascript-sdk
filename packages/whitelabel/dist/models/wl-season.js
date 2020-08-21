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
exports.__esModule = true;
exports.WLSeason = void 0;
var exposure_sdk_1 = require("@ericssonbroadcastservices/exposure-sdk");
var wl_asset_1 = require("./wl-asset");
var WLSeason = (function () {
    function WLSeason() {
    }
    __decorate([
        exposure_sdk_1.jsonProperty({ type: wl_asset_1.WLAsset }),
        __metadata("design:type", Array)
    ], WLSeason.prototype, "episodes");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLSeason.prototype, "title");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLSeason.prototype, "description");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLSeason.prototype, "seasonId");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Array)
    ], WLSeason.prototype, "images");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Number)
    ], WLSeason.prototype, "season");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Number)
    ], WLSeason.prototype, "episodeCount");
    return WLSeason;
}());
exports.WLSeason = WLSeason;
//# sourceMappingURL=wl-season.js.map