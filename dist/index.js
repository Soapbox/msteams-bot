"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_teams_1 = require("botbuilder-teams");
const botbuilder_1 = require("botbuilder");
var restify = require('restify');
const Team_1 = require("./Team");
const Bot_1 = require("./Bot");
var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
// Create chat connector for communicating with the Bot Framework Service
var botConnector = new botbuilder_1.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
// Listen for messages from users
server.post('/api/messages', botConnector.listen());
let address;
let channelAddress;
Bot_1.Bot.initialize(botConnector, function (session) {
    address = session.message.address;
    console.log(address);
});
var chatConnector = new botbuilder_teams_1.TeamsChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
Team_1.Team.initialize(chatConnector);
Bot_1.Bot.getInstance().on('conversationUpdate', function (data) {
    channelAddress = data.address;
});
server.post('api/notify', function (req, res, next) {
    console.log('notifying!');
    // const message = buildMessage(req.body.channel ? channelAddress : address, req.body.message);
    const message = buildMessage(req.body.channel ? channelAddress : address, req.body.message);
    Bot_1.Bot.getInstance().send(message);
    res.send(200);
    next();
});
function buildMessage(address, text) {
    return (new botbuilder_1.Message())
        .address(address)
        .text(text)
        .setChannelData({
        notification: {
            alert: true
        }
    })
        .textLocale('en-US');
}
function getAddressForUser(userId, channelId) {
    return {
        channelId: channelId,
        user: {
            id: userId,
        },
        bot: {
            id: address.bot.id,
            name: address.bot.name
        },
        serviceUrl: address.serviceUrl,
        useAuth: true
    };
}
function createAddress() {
    return {
        channelId: 'msteams',
        bot: {
            id: '8b3a85a3-7e27-4c46-be21-2f2a5a5d3a62'
        },
        user: {
            id: '29:13NZs-zP28iA_fzQbvbjacAWFyn6UXqYVEBwF85ZVQRHX3I2ahF26zc7Y7AZwlET4WFxI5KHaWXJwAWrU8IFxrw'
        }
    };
}
