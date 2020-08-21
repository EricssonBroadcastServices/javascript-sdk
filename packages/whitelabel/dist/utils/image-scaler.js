"use strict";
exports.__esModule = true;
exports.ImageScaler = exports.Scaler = exports.ImageSizes = void 0;
var ImageSizes;
(function (ImageSizes) {
    ImageSizes[ImageSizes["CAROUSEL_MOBILE_LANDSCAPE"] = 270] = "CAROUSEL_MOBILE_LANDSCAPE";
    ImageSizes[ImageSizes["CAROUSEL_DESKTOP_LANDSCAPE"] = 600] = "CAROUSEL_DESKTOP_LANDSCAPE";
    ImageSizes[ImageSizes["CAROUSEL_MOBILE_PORTRAIT"] = 170] = "CAROUSEL_MOBILE_PORTRAIT";
    ImageSizes[ImageSizes["CAROUSEL_DESKTOP_PORTRAIT"] = 400] = "CAROUSEL_DESKTOP_PORTRAIT";
    ImageSizes[ImageSizes["HEROBANNER_DESKTOP"] = 1920] = "HEROBANNER_DESKTOP";
    ImageSizes[ImageSizes["HEROBANNER_MOBILE"] = 800] = "HEROBANNER_MOBILE";
    ImageSizes[ImageSizes["DETAILPAGE"] = 1000] = "DETAILPAGE";
})(ImageSizes = exports.ImageSizes || (exports.ImageSizes = {}));
var Scaler = (function () {
    function Scaler() {
    }
    Scaler.prototype.fitToWidth = function (imageUrl, width) {
        if (!imageUrl) {
            return "";
        }
        if (imageUrl.includes("?")) {
            return imageUrl + "&w=" + width;
        }
        return imageUrl + "?w=" + width;
    };
    return Scaler;
}());
exports.Scaler = Scaler;
exports.ImageScaler = new Scaler();
//# sourceMappingURL=image-scaler.js.map