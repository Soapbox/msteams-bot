"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
var sprintf = require('sprintf-js').sprintf;
const Bot_1 = require("../Bot");
const Accounts_1 = require("./Accounts");
const Logger_1 = require("../Interceptors/Logger");
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
        Logger_1.Logger.log('Channels.addMembers', 'Adding members to the channel.');
        console.log(data);
        let members = data.membersAdded;
        let listUsers = Accounts_1.Accounts.list(data);
        listUsers.then((accounts) => {
            accounts.forEach((account) => {
                console.log(account);
            });
        }).catch((error) => {
            console.log('oops!');
        });
    }
}
Channels.START_CREATE = "Hello! @%s has invited me here to set up your GoodTalk " +
    "team! :smile: I'll let you know when everything is ready.";
Channels.DONE_CREATE = "Good news everybody!! Your channel is now set up on " +
    "GoodTalk. To add a new agenda item, in the channel say: " +
    "`@goodtalk add [Your discussion item]`";
Channels.ADDED = "Hello! @%s has been added!";
exports.Channels = Channels;
