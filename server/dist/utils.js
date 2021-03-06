"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SQL = require('sequelize');
exports.paginateResults = function (_a) {
    var cursor = _a.after, _b = _a.pageSize, pageSize = _b === void 0 ? 20 : _b, results = _a.results, 
    // can pass in a function to calculate an item's cursor
    _c = _a.getCursor, 
    // can pass in a function to calculate an item's cursor
    getCursor = _c === void 0 ? function (_) { return null; } : _c;
    if (pageSize < 1)
        return [];
    if (!cursor)
        return results.slice(0, pageSize);
    var cursorIndex = results.findIndex(function (item) {
        // if an item has a `cursor` on it, use that, otherwise try to generate one
        var itemCursor = item.cursor ? item.cursor : getCursor(item);
        // if there's still not a cursor, return false by default
        return itemCursor ? cursor === itemCursor : false;
    });
    return cursorIndex >= 0
        ? cursorIndex === results.length - 1 // don't let us overflow
            ? []
            : results.slice(cursorIndex + 1, Math.min(results.length, cursorIndex + 1 + pageSize))
        : results.slice(0, pageSize);
};
exports.createStore = function () {
    var Op = SQL.Op;
    var operatorsAliases = {
        $in: Op.in,
    };
    var db = new SQL('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: './store.sqlite',
        operatorsAliases: operatorsAliases,
        logging: false,
    });
    var users = db.define('user', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
        email: SQL.STRING,
        token: SQL.STRING,
    });
    var trips = db.define('trip', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
        launchId: SQL.INTEGER,
        userId: SQL.INTEGER,
    });
    return { users: users, trips: trips };
};
