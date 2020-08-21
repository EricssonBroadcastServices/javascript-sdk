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
exports.ProductOfferingsResponse = exports.WLProductOffering = exports.WLOfferingPrice = void 0;
var time_1 = require("../utils/time");
var exposure_sdk_1 = require("@ericssonbroadcastservices/exposure-sdk");
var WLOfferingPrice = (function (_super) {
    __extends(WLOfferingPrice, _super);
    function WLOfferingPrice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getPriceWithVAT = function (translations) {
            var vatString = _this.vat.percentage === 0
                ? ""
                : " - " + _this.vat.percentage + "% " + (_this.vat.included ? translations.getText("VAT_INCLUDED") : translations.getText("VAT_NOT_INCLUDED"));
            return _this.price.getPriceWithCurrency() + vatString;
        };
        _this.getPricelessVAT = function (translations) {
            var vatString = _this.vat.percentage === 0
                ? ""
                : _this.vat.percentage + "% " + (_this.vat.included ? translations.getText("VAT_INCLUDED") : translations.getText("VAT_NOT_INCLUDED"));
            return vatString;
        };
        return _this;
    }
    return WLOfferingPrice;
}(exposure_sdk_1.OfferingPrice));
exports.WLOfferingPrice = WLOfferingPrice;
var WLProductOffering = (function (_super) {
    __extends(WLProductOffering, _super);
    function WLProductOffering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRentalLengthString = function (translations) {
            var duration = _this.rentalLength
                ? time_1.parseISOStringToDuration(_this.rentalLength)
                : time_1.parseISOStringToDuration(_this.recurrence);
            var months = duration.months;
            var days = duration.days;
            var hours = duration.hours;
            var minutes = duration.minutes;
            var monthText = months > 1 ? translations.getText(["DATES", "MONTHS"]) : translations.getText(["DATES", "MONTH"]);
            var dayText = days > 1 ? translations.getText(["DATES", "DAYS"]) : translations.getText(["DATES", "DAY"]);
            var hourText = hours > 1 ? translations.getText(["DATES", "HOURS"]) : translations.getText(["DATES", "HOUR"]);
            var minuteText = minutes > 1 ? translations.getText(["DATES", "MINUTES"]) : translations.getText(["DATES", "MINUTE"]);
            return ("" + (months > 0 ? months + (" " + monthText + " ") : "") +
                ("" + (days > 0 ? days + (" " + dayText) : "")) +
                ("" + (hours > 0 ? hours + (" " + hourText + " ") : "")) +
                ("" + (minutes > 0 ? minutes + (" " + minuteText + " ") : "")));
        };
        _this.getRecurrenceString = function (translations) {
            if (parseInt(_this.getRentalLengthString(translations)) === 1) {
                return _this.getRentalLengthString(translations).replace("1", "");
            }
            return _this.getRentalLengthString(translations);
        };
        return _this;
    }
    __decorate([
        exposure_sdk_1.jsonProperty({ type: WLOfferingPrice }),
        __metadata("design:type", WLOfferingPrice)
    ], WLProductOffering.prototype, "offeringPrice");
    return WLProductOffering;
}(exposure_sdk_1.ProductOffering));
exports.WLProductOffering = WLProductOffering;
var ProductOfferingsResponse = (function () {
    function ProductOfferingsResponse() {
        this.productOfferings = [];
    }
    __decorate([
        exposure_sdk_1.jsonProperty({ type: exposure_sdk_1.ProductOffering }),
        __metadata("design:type", Array)
    ], ProductOfferingsResponse.prototype, "productOfferings");
    return ProductOfferingsResponse;
}());
exports.ProductOfferingsResponse = ProductOfferingsResponse;
//# sourceMappingURL=wl-productoffering.js.map