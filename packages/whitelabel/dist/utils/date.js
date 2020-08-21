"use strict";
exports.__esModule = true;
exports.getDayLocalized = void 0;
var date_fns_1 = require("date-fns");
exports.getDayLocalized = function (date, translations) {
    if (date_fns_1.isToday(date)) {
        return translations.getText(["DATES", "TODAY"]);
    }
    else if (date_fns_1.isTomorrow(date)) {
        return translations.getText(["DATES", "TOMORROW"]);
    }
    else if (date_fns_1.isYesterday(date)) {
        return translations.getText(["DATES", "YESTERDAY"]);
    }
    return date_fns_1.format(date, "dd/MM/yyyy");
};
//# sourceMappingURL=date.js.map