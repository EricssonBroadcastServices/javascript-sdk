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
exports.Theme = void 0;
var exposure_sdk_1 = require("@ericssonbroadcastservices/exposure-sdk");
var Theme = (function () {
    function Theme() {
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "dark");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "light");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "error");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "success");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "warning");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "primaryTextColor");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "secondaryTextColor");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "primaryBackgroundColor");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "secondaryBackgroundColor");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "primaryBrandColor");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], Theme.prototype, "heroBannerTextColor");
    return Theme;
}());
exports.Theme = Theme;
//# sourceMappingURL=wl-theme.js.map