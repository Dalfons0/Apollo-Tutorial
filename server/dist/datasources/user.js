"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_datasource_1 = require("apollo-datasource");
var isEmail = __importStar(require("isemail"));
var UserAPI = /** @class */ (function (_super) {
    __extends(UserAPI, _super);
    function UserAPI(_a) {
        var store = _a.store;
        var _this = _super.call(this) || this;
        _this.store = store;
        return _this;
    }
    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    UserAPI.prototype.initialize = function (config) {
        this.context = config.context;
    };
    /**
     * User can be called with an argument that includes email, but it doesn't
     * have to be. If the user is already on the context, it will use that user
     * instead
     */
    UserAPI.prototype.findOrCreateUser = function (_a) {
        var emailArg = (_a === void 0 ? {} : _a).email;
        return __awaiter(this, void 0, void 0, function () {
            var email, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = this.context && this.context.user ? this.context.user.email : emailArg;
                        if (!email || !isEmail.validate(email))
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.store.users.findOrCreate({ where: { email: email } })];
                    case 1:
                        users = _b.sent();
                        return [2 /*return*/, users && users[0] ? users[0] : null];
                }
            });
        });
    };
    UserAPI.prototype.bookTrips = function (_a) {
        var launchIds = _a.launchIds;
        return __awaiter(this, void 0, void 0, function () {
            var userId, results, _i, launchIds_1, launchId, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = this.context.user.id;
                        if (!userId)
                            return [2 /*return*/];
                        results = [];
                        _i = 0, launchIds_1 = launchIds;
                        _b.label = 1;
                    case 1:
                        if (!(_i < launchIds_1.length)) return [3 /*break*/, 4];
                        launchId = launchIds_1[_i];
                        return [4 /*yield*/, this.bookTrip({ launchId: launchId })];
                    case 2:
                        res = _b.sent();
                        if (res)
                            results.push(res);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, results];
                }
            });
        });
    };
    UserAPI.prototype.bookTrip = function (_a) {
        var launchId = _a.launchId;
        return __awaiter(this, void 0, void 0, function () {
            var userId, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = this.context.user.id;
                        return [4 /*yield*/, this.store.trips.findOrCreate({
                                where: { userId: userId, launchId: launchId },
                            })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res && res.length ? res[0].get() : false];
                }
            });
        });
    };
    UserAPI.prototype.cancelTrip = function (_a) {
        var launchId = _a.launchId;
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_b) {
                userId = this.context.user.id;
                return [2 /*return*/, !!this.store.trips.destroy({ where: { userId: userId, launchId: launchId } })];
            });
        });
    };
    UserAPI.prototype.getLaunchIdsByUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.context.user.id;
                        return [4 /*yield*/, this.store.trips.findAll({
                                where: { userId: userId },
                            })];
                    case 1:
                        found = _a.sent();
                        return [2 /*return*/, found && found.length
                                ? found.map(function (launch) { return launch.dataValues.launchId; })
                                    .filter(function (launch) { return !!launch; })
                                : []];
                }
            });
        });
    };
    UserAPI.prototype.isBookedOnLaunch = function (_a) {
        var launchId = _a.launchId;
        return __awaiter(this, void 0, void 0, function () {
            var userId, found;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.context || !this.context.user)
                            return [2 /*return*/, false];
                        userId = this.context.user.id;
                        return [4 /*yield*/, this.store.trips.findAll({
                                where: { userId: userId, launchId: launchId },
                            })];
                    case 1:
                        found = _b.sent();
                        return [2 /*return*/, found && found.length > 0];
                }
            });
        });
    };
    return UserAPI;
}(apollo_datasource_1.DataSource));
exports.UserAPI = UserAPI;
