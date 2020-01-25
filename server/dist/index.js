"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var schema_1 = require("./schema");
var resolvers_1 = require("./resolvers");
var utils_1 = require("./utils");
var launch_1 = require("./datasources/launch");
var user_1 = require("./datasources/user");
var store = utils_1.createStore();
var server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    dataSources: function () { return ({
        launchAPI: new launch_1.LaunchAPI(),
        userAPI: new user_1.UserAPI({ store: store })
    }); }
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server ready at " + url);
});
