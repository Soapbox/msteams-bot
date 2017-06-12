"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require('restify');
var builder = require('botbuilder');
const Bot_1 = require("./Bot");
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
// Listen for messages from users 
server.post('/api/messages', connector.listen());
Bot_1.Bot.initialize(connector, {});
