"use strict";
exports.__esModule = true;
exports.Translations = void 0;
var Translations = (function () {
    function Translations(data) {
        var _this = this;
        this.data = data;
        this.getText = function (key) {
            if (typeof key === "string") {
                return _this.data[key] || "";
            }
            else if (typeof key === "object") {
                return _this.deepGet(key);
            }
            return "";
        };
        this.deepGet = function (p) {
            return p.reduce(function (xs, x) {
                return (xs && xs[x]) ? xs[x] : null;
            }, _this.data);
        };
    }
    return Translations;
}());
exports.Translations = Translations;
//# sourceMappingURL=wl-translations.js.map