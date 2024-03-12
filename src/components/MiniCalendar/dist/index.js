"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./index.css");
var MiniCalendar = react_1.forwardRef(function (props, ref) {
    var value = props.value, onChange = props.onChange;
    react_1.useImperativeHandle(ref, function () {
        return {
            getDate: function () {
                return date;
            },
            setDate: function (date) {
                setDate(date);
            }
        };
    });
    var monthNames = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
    ];
    var _a = react_1.useState(value || new Date()), date = _a[0], setDate = _a[1];
    var handlePrevMonth = function () {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };
    var handleNextMonth = function () {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };
    var daysOfMonth = function (year, month) {
        return new Date(year, month + 1, 0).getDate();
    };
    var firstDayOfMonth = function (year, month) {
        return new Date(year, month, 1).getDay();
    };
    var renderDays = function () {
        var days = [];
        var daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
        var firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
        for (var i = 0; i < firstDay; i++) {
            days.push(React.createElement("div", { key: "empty=" + i, className: "empty" }));
        }
        for (var i = 1; i <= daysCount; i++) {
            var clickHandle = onChange === null || onChange === void 0 ? void 0 : onChange.bind(null, new Date(date.getFullYear(), date.getMonth(), i));
            if (i === date.getDate()) {
                days.push(React.createElement("div", { key: "day=" + i, className: "day selected", onChange: clickHandle }, i));
            }
            else {
                days.push(React.createElement("div", { key: "day=" + i, className: "day", onClick: clickHandle }, i));
            }
        }
        return days;
    };
    return (React.createElement("div", { className: "calendar" },
        React.createElement("div", { className: "header" },
            React.createElement("button", { onClick: handlePrevMonth }, "<"),
            React.createElement("div", null,
                date.getFullYear(),
                "\u5E74",
                monthNames[date.getMonth()]),
            React.createElement("button", { onClick: handleNextMonth }, ">")),
        React.createElement("div", { className: "days" },
            React.createElement("div", { className: "day" }, "\u65E5"),
            React.createElement("div", { className: "day" }, "\u4E00"),
            React.createElement("div", { className: "day" }, "\u4E8C"),
            React.createElement("div", { className: "day" }, "\u4E09"),
            React.createElement("div", { className: "day" }, "\u56DB"),
            React.createElement("div", { className: "day" }, "\u4E94"),
            React.createElement("div", { className: "day" }, "\u516D"),
            renderDays())));
});
exports["default"] = MiniCalendar;
