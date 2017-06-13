var restify = require('restify');
var builder = require('botbuilder');
import * as teams from 'botbuilder-teams'
import { Bot } from './Bot'
import { Team } from './Team'

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var botConnector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', botConnector.listen());

Bot.initialize(botConnector, {});

var chatConnector = new teams.TeamsChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

Team.initialize(chatConnector);