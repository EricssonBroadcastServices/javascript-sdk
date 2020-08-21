"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.WLHerobanner = exports.WLHerobannerItem = exports.WLCarousel = exports.WLComponent = exports.CarouselSubType = void 0;
var exposure_sdk_1 = require("@ericssonbroadcastservices/exposure-sdk");
var wl_asset_1 = require("./wl-asset");
var image_scaler_1 = require("../utils/image-scaler");
var wl_config_1 = require("./wl-config");
var CarouselSubType;
(function (CarouselSubType) {
    CarouselSubType["EPG"] = "epg";
    CarouselSubType["PROGRESS"] = "progress";
})(CarouselSubType = exports.CarouselSubType || (exports.CarouselSubType = {}));
var WLComponent = (function () {
    function WLComponent() {
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLComponent.prototype, "id");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLComponent.prototype, "type");
    return WLComponent;
}());
exports.WLComponent = WLComponent;
var WLCarousel = (function (_super) {
    __extends(WLCarousel, _super);
    function WLCarousel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WLCarousel.prototype.getInitialSlide = function () {
        var _a;
        switch (this.subType) {
            case CarouselSubType.EPG:
                return ((_a = this.assets.map(function (a, i) { return (__assign(__assign({}, a), { index: i })); }).find(function (a) { return a.isLive(); })) === null || _a === void 0 ? void 0 : _a.index) || 0;
            default:
                return 0;
        }
    };
    WLCarousel.fromSeason = function (season) {
        var carousel = new WLCarousel();
        carousel.title = season.title;
        carousel.assets = season.episodes.map(function (e) {
            return Array.isArray(e) ? exposure_sdk_1.deserialize(wl_asset_1.WLAsset, e[0]) : e;
        });
        return carousel;
    };
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLCarousel.prototype, "title");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLCarousel.prototype, "subType");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: wl_asset_1.WLAsset }),
        __metadata("design:type", Array)
    ], WLCarousel.prototype, "assets");
    return WLCarousel;
}(WLComponent));
exports.WLCarousel = WLCarousel;
var WLHerobannerItem = (function () {
    function WLHerobannerItem() {
    }
    WLHerobannerItem.prototype.getScaledImage = function (orientation, width) {
        var _a;
        var imageUrl = (_a = this.images.find(function (image) { return image.orientation.toUpperCase() === orientation.toUpperCase(); })) === null || _a === void 0 ? void 0 : _a.url;
        return image_scaler_1.ImageScaler.fitToWidth(imageUrl, width);
    };
    __decorate([
        exposure_sdk_1.jsonProperty({ type: exposure_sdk_1.ImageModel }),
        __metadata("design:type", Array)
    ], WLHerobannerItem.prototype, "images");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLHerobannerItem.prototype, "title");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLHerobannerItem.prototype, "description");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLHerobannerItem.prototype, "trailerAssetId");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: wl_config_1.WLAction }),
        __metadata("design:type", wl_config_1.WLAction)
    ], WLHerobannerItem.prototype, "action");
    return WLHerobannerItem;
}());
exports.WLHerobannerItem = WLHerobannerItem;
var WLHerobanner = (function (_super) {
    __extends(WLHerobanner, _super);
    function WLHerobanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        exposure_sdk_1.jsonProperty({ type: WLHerobannerItem }),
        __metadata("design:type", Array)
    ], WLHerobanner.prototype, "items");
    return WLHerobanner;
}(WLComponent));
exports.WLHerobanner = WLHerobanner;
//# sourceMappingURL=wl-component.js.map