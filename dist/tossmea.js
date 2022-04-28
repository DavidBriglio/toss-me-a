"use strict";
exports.__esModule = true;
var fakeNumber = function (min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var fakeMap = {
    string: function (length) {
        return (Math.random() + 1).toString(36).substring(2, (length || 10) + 2);
    },
    number: fakeNumber,
    boolean: function () { return fakeNumber() % 2 === 0; },
    date: function () { return new Date(Math.random() * 900000); },
    array: function (type, length) {
        var _a;
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push((_a = fakeMap[type]) === null || _a === void 0 ? void 0 : _a.call(fakeMap));
        }
        return result;
    }
};
function tossMeA(thing, count) {
    if (count === void 0) { count = 1; }
    var result = [];
    var _loop_1 = function (i) {
        var item = {};
        Object.keys(thing).forEach(function (key) {
            var value = thing[key];
            if (Array.isArray(value)) {
                item[key] = fakeMap.array(value[0], value[1]);
            }
            else {
                switch (typeof value) {
                    case 'object':
                        item[key] = quickThing(value);
                        break;
                    case 'string':
                        var _a = value.split('-'), type = _a[0], mod = _a.slice(1);
                        item[key] = fakeMap[type].apply(fakeMap, mod);
                        break;
                    case 'function':
                        item[key] = value();
                        break;
                    default:
                        item[key] = value;
                }
            }
        });
        result.push(item);
    };
    for (var i = 0; i < count; i++) {
        _loop_1(i);
    }
    return result.length === 1 ? result[0] : result;
}
exports["default"] = tossMeA;
