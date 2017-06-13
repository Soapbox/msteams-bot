import { TeamsChatConnector } from 'botbuilder-teams'
import { ChatConnector } from 'botbuilder'
var restify = require('restify');
import { Team } from './Team'
import { Bot } from './Bot'

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var botConnector = new ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', botConnector.listen());

Bot.initialize(botConnector, {});

var chatConnector = new TeamsChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

Team.initialize(chatConnector);