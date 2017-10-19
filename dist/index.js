"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_teams_1 = require("botbuilder-teams");
const botbuilder_1 = require("botbuilder");
var restify = require('restify');
const Team_1 = require("./Team");
const Bot_1 = require("./Bot");
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
// Create chat connector for communicating with the Bot Framework Service
var botConnector = new botbuilder_1.ChatConnector({
    appId: 'b49e7913-3b3f-4125-adde-2b698fc12c8b',
    appPassword: 'jv9E8LCYLi9yEMfvqkVEEsH'
});
// Listen for messages from users
server.post('/api/messages', botConnector.listen());
Bot_1.Bot.initialize(botConnector, {});
var chatConnector = new botbuilder_teams_1.TeamsChatConnector({
    appId: 'b49e7913-3b3f-4125-adde-2b698fc12c8b',
    appPassword: 'jv9E8LCYLi9yEMfvqkVEEsH'
});
Team_1.Team.initialize(chatConnector);
