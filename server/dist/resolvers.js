"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        launches: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return dataSources.launchAPI.getAllLaunches();
        },
        launch: function (_, _a, _b) {
            var id = _a.id;
            var dataSources = _b.dataSources;
            return dataSources.launchAPI.getLaunchById({ launchId: id });
        },
        me: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return dataSources.userAPI.findOrCreateUser();
        }
    }
};
