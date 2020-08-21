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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.WhiteLabelService = void 0;
var exposure_sdk_1 = require("@EricssonBroadcastServices/exposure-sdk");
var index_1 = require("../index");
var query_string_1 = require("query-string");
var WhiteLabelService = (function (_super) {
    __extends(WhiteLabelService, _super);
    function WhiteLabelService(apiOptions) {
        var _this = this;
        var deviceGroup = apiOptions.deviceGroup, origin = apiOptions.origin, baseOptions = __rest(apiOptions, ["deviceGroup", "origin"]);
        _this = _super.call(this, baseOptions) || this;
        _this.origin = origin;
        _this.deviceGroup = deviceGroup;
        return _this;
    }
    WhiteLabelService.prototype.getConfig = function (_a) {
        var locale = _a.locale;
        return this.get("/api/internal/origin/config?locale=" + locale + "&deviceGroup=" + this.deviceGroup + "&origin=" + this.origin)
            .then(function (data) { return exposure_sdk_1.deserialize(index_1.WLConfig, data); });
    };
    WhiteLabelService.prototype.getConfigByCustomerAndBusinessUnit = function (_a) {
        var locale = _a.locale, customer = _a.customer, businessUnit = _a.businessUnit;
        return this.get("/api/internal/customer/" + customer + "/businessunit/" + businessUnit + "/config?locale=" + locale + "&deviceGroup=" + this.deviceGroup)
            .then(function (data) { return exposure_sdk_1.deserialize(index_1.WLConfig, data); });
    };
    WhiteLabelService.prototype.getTranslations = function (locale) {
        return this.get("/api/internal/translations/" + locale);
    };
    WhiteLabelService.prototype.getPage = function (_a) {
        var customer = _a.customer, businessUnit = _a.businessUnit, pageId = _a.pageId, locale = _a.locale;
        return this.get("/api/internal/customer/" + customer + "/businessunit/" + businessUnit + "/page/" + pageId + "?deviceGroup=" + this.deviceGroup + "&locale=" + locale)
            .then(function (data) { return exposure_sdk_1.deserialize(index_1.WLPageModel, data); });
    };
    WhiteLabelService.prototype.getComponentByInternalUrl = function (_a) {
        var internalUrl = _a.internalUrl, type = _a.type, useAuthHeader = _a.useAuthHeader;
        var headers = useAuthHeader ? this.options.authHeader() : undefined;
        return this.get(internalUrl, headers)
            .then(function (data) { return exposure_sdk_1.deserialize(type, data); });
    };
    WhiteLabelService.prototype.getAssetPageById = function (_a) {
        var customer = _a.customer, businessUnit = _a.businessUnit, assetId = _a.assetId, locale = _a.locale;
        return this.get("/api/internal/customer/" + customer + "/businessunit/" + businessUnit + "/detailPage/" + assetId + "?deviceGroup=" + this.deviceGroup + "&locale=" + locale)
            .then(function (data) { return exposure_sdk_1.deserialize(index_1.WLPageModel, data); });
    };
    WhiteLabelService.prototype.getAssetById = function (_a) {
        var customer = _a.customer, businessUnit = _a.businessUnit, assetId = _a.assetId, locale = _a.locale;
        return this.get("/api/internal/exposure/v1/customer/" + customer + "/businessunit/" + businessUnit + "/content/asset/" + assetId + "?deviceGroup=" + this.deviceGroup + "&locale=" + locale + "&includeSeasons=true&fieldSet=ALL&includeEpisodes=true")
            .then(function (data) { return exposure_sdk_1.deserialize(index_1.WLAsset, data); });
    };
    WhiteLabelService.prototype.getAssetsByIds = function (_a) {
        var customer = _a.customer, businessUnit = _a.businessUnit, assetIds = _a.assetIds, locale = _a.locale;
        return this.getAssets({ customer: customer, businessUnit: businessUnit, assetIds: assetIds, locale: locale });
    };
    WhiteLabelService.prototype.getAssets = function (_a) {
        var customer = _a.customer, businessUnit = _a.businessUnit, locale = _a.locale, assetIds = _a.assetIds, _b = _a.sortOrder, sortOrder = _b === void 0 ? "-created" : _b, products = _a.products, type = _a.type;
        var queryString = query_string_1["default"].stringify({
            locale: locale,
            deviceGroup: this.deviceGroup,
            includeSeasons: true,
            fieldSet: "ALL",
            includeEpisodes: true,
            assetIds: assetIds,
            sort: sortOrder,
            products: products,
            assetType: type
        });
        return this.get("/api/internal/exposure/v1/customer/" + customer + "/businessunit/" + businessUnit + "/content/asset?" + queryString)
            .then(function (data) { return data.items.map(function (a) { return exposure_sdk_1.deserialize(index_1.WLAsset, a); }); });
    };
    WhiteLabelService.prototype.search = function (_a) {
        var url = _a.url, searchTerm = _a.searchTerm;
        return this.get(url.replace("{query}", searchTerm))
            .then(function (data) {
            return data.items.map(function (item) { return exposure_sdk_1.deserialize(index_1.WLAsset, item); });
        });
    };
    return WhiteLabelService;
}(exposure_sdk_1.BaseService));
exports.WhiteLabelService = WhiteLabelService;
//# sourceMappingURL=white-label-service.js.map