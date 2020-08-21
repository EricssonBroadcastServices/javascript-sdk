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
exports.WLAsset = exports.WLTag = void 0;
var image_scaler_1 = require("../utils/image-scaler");
var wl_season_1 = require("./wl-season");
var time_1 = require("../utils/time");
var date_1 = require("../utils/date");
var exposure_sdk_1 = require("@ericssonbroadcastservices/exposure-sdk");
var WLTag = (function () {
    function WLTag() {
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLTag.prototype, "title");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLTag.prototype, "tagType");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLTag.prototype, "id");
    return WLTag;
}());
exports.WLTag = WLTag;
var WLAsset = (function () {
    function WLAsset() {
        var _this = this;
        this.publications = [];
        this.externalReferences = [];
        this.participants = [];
        this.seasons = [];
        this.getDurationString = function () {
            var assetDuration = _this.duration;
            if (!assetDuration)
                return;
            return time_1.getDurationLocalized(assetDuration);
        };
        this.isLive = function () {
            if (_this.startTime && _this.endTime) {
                var now = new Date();
                var startTime = new Date(_this.startTime);
                var endTime = new Date(_this.endTime);
                if (endTime > now && startTime <= now) {
                    return true;
                }
            }
            return false;
        };
        this.inFuture = function () {
            if (_this.publications.length === 0) {
                return false;
            }
            return _this.publications[0].fromDate.getTime() > Date.now();
        };
        this.getIsEntitled = function (availabilityKeys) {
            return _this.getHasProperProduct(availabilityKeys) && !_this.inFuture();
        };
        this.getActionLink = function (userEntitlements, availabilityKeys) {
            var _a;
            switch ((_a = _this.action) === null || _a === void 0 ? void 0 : _a.type) {
                case "NavigateToDetails":
                    return _this.getBrowseLink();
                case "PlayAsset":
                    return _this.getPlayLink(userEntitlements, availabilityKeys);
            }
            return "";
        };
        this.getBrowseLink = function () {
            switch (_this.type) {
                case exposure_sdk_1.AssetType.TV_SHOW:
                    return "/asset/" + _this.assetId;
                default:
                    return "/asset/" + _this.assetId;
            }
        };
        this.getPlayLink = function (userEntitlements, availabilityKeys) {
            switch (_this.type) {
                case exposure_sdk_1.AssetType.TV_SHOW:
                    return "/asset/" + _this.assetId;
                case exposure_sdk_1.AssetType.EPISODE:
                    return _this.getIsEntitled(availabilityKeys)
                        ? "/play/" + _this.assetId + "?playlist=season"
                        : "/asset/" + _this.assetId;
                default:
                    if (_this.tvShowId && _this.season) {
                        return _this.getIsEntitled(availabilityKeys)
                            ? "/play/" + _this.assetId + "?playlist=season"
                            : "/asset/" + _this.assetId;
                    }
                    if (_this.anonymousIsAllowed(userEntitlements)) {
                        return "/play/anonymous/" + _this.assetId;
                    }
                    return _this.getIsEntitled(availabilityKeys) ? "/play/" + _this.assetId : "/asset/" + _this.assetId;
            }
        };
        this.requiredProducts = function () {
            return [].concat.apply([], _this.publications.map(function (pub) { return pub.products; }));
        };
        this.getAvailabilityKeys = function () {
            return [].concat.apply([], _this.publications.map(function (pub) { return pub.availabilityKeys; }));
        };
        this.getHasProperProduct = function (userAvailabilityKeys) {
            var isEntitled = userAvailabilityKeys.filter(function (key) { return _this.getAvailabilityKeys().includes(key); });
            return isEntitled.length > 0;
        };
        this.getBuyableProductOfferings = function (availableProductOfferings) {
            var buyable = [].concat
                .apply([], availableProductOfferings.map(function (po) { return po.productIds; }))
                .filter(function (p) { return _this.requiredProducts().includes(p); });
            return availableProductOfferings.filter(function (po) { return po.productIds.filter(function (pId) { return buyable.includes(pId); }).length > 0; });
        };
        this.getAnonymousProducts = function (userEntitlements) {
            return userEntitlements.filter(function (ut) { return ut.anonymousAllowed; }).map(function (ut) { return ut.id; });
        };
        this.anonymousIsAllowed = function (userEntitlements) {
            return _this.getAnonymousProducts(userEntitlements).filter(function (p) { return _this.requiredProducts().includes(p); }).length > 0;
        };
        this.getLocalAssetStartTimeString = function () {
            if (_this.getStartTime()) {
                return time_1.getTimeString(_this.startTime);
            }
            return null;
        };
        this.getLocalStartDayString = function (translations) {
            if (_this.startTime) {
                return date_1.getDayLocalized(_this.startTime, translations);
            }
            return null;
        };
        this.getStartTime = function () {
            if (_this.publications.length === 0 && !_this.startTime) {
                return undefined;
            }
            return _this.startTime ? new Date(_this.startTime) : _this.publications[0].fromDate;
        };
        this.isGeoBlocked = function (location) {
            if (!location) {
                return false;
            }
            var isBlocked = false;
            _this.publications.forEach(function (publication) {
                if (publication.countries.length > 0) {
                    if (!publication.countries.includes(location.countryCode)) {
                        isBlocked = true;
                    }
                }
            });
            return isBlocked;
        };
    }
    WLAsset.prototype.getScaledImage = function (orientation, width) {
        var _a;
        var imageUrl = (_a = this.images.find(function (image) { return image.orientation.toUpperCase() === orientation.toUpperCase(); })) === null || _a === void 0 ? void 0 : _a.url;
        return image_scaler_1.ImageScaler.fitToWidth(imageUrl, width);
    };
    __decorate([
        exposure_sdk_1.jsonProperty({ externalName: "assetId" }),
        __metadata("design:type", String)
    ], WLAsset.prototype, "id");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAsset.prototype, "type");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAsset.prototype, "assetId");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAsset.prototype, "title");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAsset.prototype, "description");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: exposure_sdk_1.ImageModel }),
        __metadata("design:type", Array)
    ], WLAsset.prototype, "images");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: exposure_sdk_1.Publication }),
        __metadata("design:type", Array)
    ], WLAsset.prototype, "publications");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: exposure_sdk_1.ExternalReferences }),
        __metadata("design:type", Array)
    ], WLAsset.prototype, "externalReferences");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAsset.prototype, "tvShowId");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Number)
    ], WLAsset.prototype, "season");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: exposure_sdk_1.Participants }),
        __metadata("design:type", Array)
    ], WLAsset.prototype, "participants");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Date)
    ], WLAsset.prototype, "startTime");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Date)
    ], WLAsset.prototype, "endTime");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Number)
    ], WLAsset.prototype, "duration");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Number)
    ], WLAsset.prototype, "year");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: WLTag }),
        __metadata("design:type", Array)
    ], WLAsset.prototype, "tags");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Object)
    ], WLAsset.prototype, "action");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: wl_season_1.WLSeason }),
        __metadata("design:type", Array)
    ], WLAsset.prototype, "seasons");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Object)
    ], WLAsset.prototype, "bookmark");
    return WLAsset;
}());
exports.WLAsset = WLAsset;
//# sourceMappingURL=wl-asset.js.map