"use strict";
exports.__esModule = true;
var react_1 = require("react");
var MiniCalendar_1 = require("./components/MiniCalendar");
var App = function () {
    var miniCalendarRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var _a;
        console.log((_a = miniCalendarRef.current) === null || _a === void 0 ? void 0 : _a.getDate().toLocaleDateString());
        setTimeout(function () {
            var _a;
            (_a = miniCalendarRef.current) === null || _a === void 0 ? void 0 : _a.setDate(new Date(2024, 2, 1));
        }, 3000);
    }, []);
    return (React.createElement("div", { className: "App" },
        React.createElement(MiniCalendar_1["default"], { value: new Date('2024-3-1'), onChange: function (data) { return alert(data.toLocaleDateString()); } }),
        React.createElement(MiniCalendar_1["default"], { value: new Date('2024-2-29'), ref: miniCalendarRef })));
};
exports["default"] = App;
