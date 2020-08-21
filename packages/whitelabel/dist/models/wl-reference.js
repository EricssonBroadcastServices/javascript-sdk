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
exports.WLReference = exports.WLReferencePresentation = void 0;
var orientation_1 = require("../interfaces/orientation");
var wl_reference_1 = require("../interfaces/wl-reference");
var wl_component_1 = require("../interfaces/wl-component");
var exposure_sdk_1 = require("@ericssonbroadcastservices/exposure-sdk");
var WLReferencePresentation = (function () {
    function WLReferencePresentation() {
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLReferencePresentation.prototype, "imageOrientation");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLReferencePresentation.prototype, "layout");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLReferencePresentation.prototype, "imageAspectRatio");
    return WLReferencePresentation;
}());
exports.WLReferencePresentation = WLReferencePresentation;
var WLReference = (function () {
    function WLReference() {
        this.presentation = {
            layout: wl_reference_1.CarouselLayout.CAROUSEL,
            imageOrientation: orientation_1.Orientation.LANDSCAPE,
            imageAspectRatio: exposure_sdk_1.AspectRatio.SIXTEEN_BY_NINE
        };
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLReference.prototype, "id");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLReference.prototype, "internalUrl");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Boolean)
    ], WLReference.prototype, "authorized");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Number)
    ], WLReference.prototype, "reloadInterval");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLReference.prototype, "type");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", WLReferencePresentation)
    ], WLReference.prototype, "presentation");
    return WLReference;
}());
exports.WLReference = WLReference;
//# sourceMappingURL=wl-reference.js.map