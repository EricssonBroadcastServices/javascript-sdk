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
exports.WLConfig = exports.WLFooter = exports.WLSystemConfig = exports.WLLanguage = exports.WLSocialMediaLink = exports.WLMenuItem = exports.WLAction = exports.ThemeModel = exports.paddings = exports.breakpoints = void 0;
var wl_reference_1 = require("./wl-reference");
var wl_action_1 = require("../interfaces/wl-action");
var wl_theme_1 = require("./wl-theme");
var exposure_sdk_1 = require("@ericssonbroadcastservices/exposure-sdk");
exports.breakpoints = {
    mobile: "600px",
    tablet: "839px",
    desktop: "1200px",
    mediumDesktop: "1300px",
    mediumLargeDesktop: "1525px",
    largeDesktop: "1800px"
};
exports.paddings = {
    half: "1rem",
    basic: "2rem",
    double: "4rem",
    mobile: "0.5rem"
};
var ThemeModel = (function (_super) {
    __extends(ThemeModel, _super);
    function ThemeModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.breakpoints = exports.breakpoints;
        _this.padding = exports.paddings;
        return _this;
    }
    return ThemeModel;
}(wl_theme_1.Theme));
exports.ThemeModel = ThemeModel;
var WLAction = (function () {
    function WLAction() {
        var _this = this;
        this.getLink = function () {
            switch (_this.type) {
                case wl_action_1.WLActionType.ExternalLink:
                    return _this.url;
                case wl_action_1.WLActionType.NavigateToPage:
                    return "/page/" + _this.pageId;
                case wl_action_1.WLActionType.NavigateToDetails:
                    return "/asset/" + _this.assetId;
                case wl_action_1.WLActionType.PlayAsset:
                    return "/play/" + _this.assetId;
                default:
                    return "";
            }
        };
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAction.prototype, "target");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAction.prototype, "type");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAction.prototype, "url");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAction.prototype, "pageId");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLAction.prototype, "assetId");
    return WLAction;
}());
exports.WLAction = WLAction;
var WLMenuItem = (function () {
    function WLMenuItem() {
        var _this = this;
        this.getLink = function () {
            return _this.action.getLink();
        };
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLMenuItem.prototype, "title");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", WLAction)
    ], WLMenuItem.prototype, "action");
    return WLMenuItem;
}());
exports.WLMenuItem = WLMenuItem;
var WLSocialMediaLink = (function () {
    function WLSocialMediaLink() {
        var _this = this;
        this.getLink = function () {
            return _this.action.getLink();
        };
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLSocialMediaLink.prototype, "icon");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", WLAction)
    ], WLSocialMediaLink.prototype, "action");
    return WLSocialMediaLink;
}());
exports.WLSocialMediaLink = WLSocialMediaLink;
var WLLanguage = (function () {
    function WLLanguage() {
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLLanguage.prototype, "code");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLLanguage.prototype, "name");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLLanguage.prototype, "nativeName");
    return WLLanguage;
}());
exports.WLLanguage = WLLanguage;
var WLSystemConfig = (function (_super) {
    __extends(WLSystemConfig, _super);
    function WLSystemConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        exposure_sdk_1.jsonProperty({ externalName: "displayLocales", type: WLLanguage }),
        __metadata("design:type", Array)
    ], WLSystemConfig.prototype, "locales");
    return WLSystemConfig;
}(exposure_sdk_1.SystemConfig));
exports.WLSystemConfig = WLSystemConfig;
var WLFooter = (function () {
    function WLFooter() {
    }
    __decorate([
        exposure_sdk_1.jsonProperty({ type: WLMenuItem }),
        __metadata("design:type", Array)
    ], WLFooter.prototype, "menuItems");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: WLSocialMediaLink }),
        __metadata("design:type", Array)
    ], WLFooter.prototype, "socialMediaLinks");
    return WLFooter;
}());
exports.WLFooter = WLFooter;
var WLConfig = (function () {
    function WLConfig() {
        var _this = this;
        this.systemConfig = new WLSystemConfig();
        this.theme = new ThemeModel();
        this.getShouldUseFreeForAll = function () { return _this.systemConfig.frontendFeatures.shouldAlwaysUseAnonymousLogin; };
    }
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", wl_reference_1.WLReference)
    ], WLConfig.prototype, "homePage");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "customer");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "businessUnit");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "title");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "description");
    __decorate([
        exposure_sdk_1.jsonProperty({ type: WLMenuItem }),
        __metadata("design:type", Array)
    ], WLConfig.prototype, "menu");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "logo");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "favicon");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "backgroundImage");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", WLSystemConfig)
    ], WLConfig.prototype, "systemConfig");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", ThemeModel)
    ], WLConfig.prototype, "theme");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Object)
    ], WLConfig.prototype, "appConfig");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "appStoreId");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", String)
    ], WLConfig.prototype, "logoUrl");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Object)
    ], WLConfig.prototype, "apiConfig");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Object)
    ], WLConfig.prototype, "contactInformation");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", Object)
    ], WLConfig.prototype, "parameters");
    __decorate([
        exposure_sdk_1.jsonProperty(),
        __metadata("design:type", WLFooter)
    ], WLConfig.prototype, "footer");
    return WLConfig;
}());
exports.WLConfig = WLConfig;
//# sourceMappingURL=wl-config.js.map