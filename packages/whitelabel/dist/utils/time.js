"use strict";
exports.__esModule = true;
exports.getDurationLocalized = exports.getTimeString = exports.parseISOStringToDuration = exports.parseSecondsToDuration = void 0;
var iso8601_duration_1 = require("iso8601-duration");
var format_1 = require("date-fns/format");
exports.parseSecondsToDuration = function (input) {
    var hours = Math.floor(input / 3600);
    var minutes = Math.floor((input - hours * 3600) / 60);
    var seconds = Math.floor(input - hours * 3600 - minutes * 60);
    return {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
};
exports.parseISOStringToDuration = function (durationString) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!durationString) {
        return { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    var duration = iso8601_duration_1.parse(durationString);
    return {
        years: (_a = duration.years) !== null && _a !== void 0 ? _a : 0,
        months: (_b = duration.months) !== null && _b !== void 0 ? _b : 0,
        weeks: (_c = duration.weeks) !== null && _c !== void 0 ? _c : 0,
        days: (_d = duration.days) !== null && _d !== void 0 ? _d : 0,
        hours: (_e = duration.hours) !== null && _e !== void 0 ? _e : 0,
        minutes: (_f = duration.minutes) !== null && _f !== void 0 ? _f : 0,
        seconds: (_g = duration.seconds) !== null && _g !== void 0 ? _g : 0
    };
};
exports.getTimeString = function (date) {
    return format_1["default"](date, "HH:mm");
};
exports.getDurationLocalized = function (input) {
    var duration = exports.parseSecondsToDuration(input);
    var hours = duration.hours;
    var minutes = duration.minutes;
    var seconds = duration.seconds;
    return "  " + (hours > 0 ? hours + "h " : "") + "  " + (minutes > 0 ? minutes + "min " : "") + "  " + (minutes < 1 && seconds > 0 ? seconds + "sec" : "") + "  ";
};
//# sourceMappingURL=time.js.map