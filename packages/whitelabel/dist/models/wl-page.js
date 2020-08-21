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
exports.WLPageModel = void 0;
var wl_component_1 = require("./wl-component");
var wl_reference_1 = require("./wl-reference");
var exposure_sdk_1 = require("@ericssonbroadcastservices/exposure-sdk");
var WLPageModel = (function (_super) {
    __extends(WLPageModel, _super);
    function WLPageModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        exposure_sdk_1.jsonProperty({ type: wl_reference_1.WLReference }),
        __metadata("design:type", Array)
    ], WLPageModel.prototype, "components");
    return WLPageModel;
}(wl_component_1.WLComponent));
exports.WLPageModel = WLPageModel;
//# sourceMappingURL=wl-page.js.map