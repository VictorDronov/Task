"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var Task = function (_a) {
    var _id = _a._id, complete = _a.complete, user_id = _a.user_id, task = _a.task, deleteTask = _a.deleteTask, completeTask = _a.completeTask;
    // const [isShowingDetails, setShowingDetails] = useState<boolean>(false);
    var _b = react_1.useState(false), deleting = _b[0], setDeleting = _b[1];
    var DelayDelete = function () {
        if (complete === true) {
            setDeleting(true);
            setTimeout(function () {
                deleteTask(_id, complete === true);
                setDeleting(false);
            }, 5000);
        }
        else {
            return;
        }
    };
    react_1.useEffect(function () {
        DelayDelete();
    });
    return (react_1["default"].createElement("div", { className: (deleting ? "animate-fade-out" : "") + " w-full p-3 m-auto mb-3 bg-gray-800 rounded-xl md:w-6/12 " },
        react_1["default"].createElement("div", { className: "flex flex-row" },
            react_1["default"].createElement("div", { className: "flex self-center justify-between w-full" }, complete === true ? (react_1["default"].createElement("div", { className: "flex flex-row" },
                react_1["default"].createElement("div", { className: "self-center p-1 border-2 border-solid rounded-md cursor-pointer border-brand-primary hover:opacity-80 bg-brand-primary", onClick: function () { return completeTask(_id, !complete); } },
                    react_1["default"].createElement(fa_1.FaCheck, { className: "text-brand-secondary" })),
                react_1["default"].createElement("h3", { className: "ml-3 font-semibold tracking-wider line-through" }, task))) : (react_1["default"].createElement("div", { className: "flex flex-row" },
                react_1["default"].createElement("div", { className: "p-3 border-2 border-solid rounded-md cursor-pointer border-brand-primary hover:opacity-80", onClick: function () { return completeTask(_id, !complete); } }),
                react_1["default"].createElement("h3", { className: "ml-3 font-semibold tracking-wider" }, task)))))));
};
exports["default"] = Task;
