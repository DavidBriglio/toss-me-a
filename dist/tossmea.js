"use strict";
exports.__esModule = true;
var fakeNumber = function (min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var fakeMap = {
    number: fakeNumber,
    boolean: function () { return fakeNumber() % 2 === 0; },
    string: function (length, formatted) {
        if (length === void 0) { length = 10; }
        if (formatted === void 0) { formatted = ''; }
        var result = '';
        var isFormatted = formatted.toLowerCase() === 'f';
        while (result.length < length) {
            result +=
                Math.random()
                    .toString(36)
                    .substring(2)
                    .substring(isFormatted ? fakeNumber(1, 8) : 0) +
                    (isFormatted ? ' ' : '');
        }
        return result;
    },
    date: function (start, end) {
        var startDate = start ? parseInt(start) : 0;
        var endDate = end ? parseInt(end) : Date.now();
        return new Date(startDate + Math.random() * (endDate - startDate));
    }
};
function tossMeA(thing, ammount) {
    if (ammount === void 0) { ammount = 1; }
    var result = [];
    var counter = ammount > 0 ? ammount : 1;
    var _loop_1 = function (i) {
        var item = null;
        if (!Array.isArray(thing) && typeof thing === 'object') {
            item = {};
            Object.keys(thing).forEach(function (key) {
                item[key] = tossMeA(thing[key]);
            });
        }
        else if (Array.isArray(thing)) {
            item = tossMeA(thing[0], thing[1]);
        }
        else {
            switch (typeof thing) {
                case 'string':
                    var _a = thing.split('-'), type = _a[0], mod = _a.slice(1);
                    item = fakeMap[type].apply(fakeMap, mod);
                    break;
                case 'function':
                    item = thing();
                    break;
                default:
                    item = thing;
                    break;
            }
        }
        result.push(item);
    };
    for (var i = 0; i < counter; i++) {
        _loop_1(i);
    }
    return result.length === 1 ? result[0] : result;
}
exports["default"] = tossMeA;
