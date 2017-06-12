"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
var sprintf = require('sprintf-js').sprintf;
const Bot_1 = require("../Bot");
const Users_1 = require("./Users");
class Channels {
    static create(data) {
        let bot = Bot_1.Bot.getInstance();
        let start = new builder.Message();
        start.address(data.address);
        start.text(sprintf(Channels.START_CREATE, data.user.name));
        bot.send(start);
        let end = new builder.Message();
        end.address(data.address);
        end.text(sprintf(Channels.DONE_CREATE, data.user.name));
        bot.send(end);
    }
    static addMembers(data) {
        let bot = Bot_1.Bot.getInstance();
        let members = data.membersAdded;
        // Get the users
        Users_1.Users.lookup(data);
        // members.forEach((member: any) => {
        //     let message = new builder.Message();
        //     message.address(data.address);
        //     message.text(sprintf(Channels.ADDED, member.name));
        //     bot.send(message);
        //     // Make an api call here
        // });
    }
}
Channels.START_CREATE = "Hello! @%s has invited me here to set up your GoodTalk " +
    "team! :smile: I'll let you know when everything is ready.";
Channels.DONE_CREATE = "Good news everybody!! Your channel is now set up on " +
    "GoodTalk. To add a new agenda item, in the channel say: " +
    "`@goodtalk add [Your discussion item]`";
Channels.ADDED = "Hello! @%s has been added!";
exports.Channels = Channels;
