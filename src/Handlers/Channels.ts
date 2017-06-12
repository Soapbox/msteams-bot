import * as builder from 'botbuilder'
import * as teams from 'botbuilder-teams'
var sprintf = require('sprintf-js').sprintf;
import { Bot } from '../Bot'
import { Accounts } from './Accounts'
import { Logger } from '../Interceptors/Logger'

export class Channels {
    public static START_CREATE = "Hello! @%s has invited me here to set up your GoodTalk " +
        "team! :smile: I'll let you know when everything is ready.";
    public static DONE_CREATE = "Good news everybody!! Your channel is now set up on " +
        "GoodTalk. To add a new agenda item, in the channel say: " + 
        "`@goodtalk add [Your discussion item]`";
    public static ADDED = "Hello! @%s has been added!";

    public static create(data: any): void {
        let bot = Bot.getInstance();
        let start = new builder.Message();

        start.address(data.address);
        start.text(sprintf(Channels.START_CREATE, data.user.name));

        bot.send(start);

        let end = new builder.Message();

        end.address(data.address);
        end.text(sprintf(Channels.DONE_CREATE, data.user.name));

        bot.send(end);
    }

    public static addMembers(data: any): void {
        Logger.log('Channels.addMembers', 'Adding members to the channel.');
        console.log(data);

        let members = data.membersAdded;

        let listUsers = Accounts.list(data);

        listUsers.then((accounts: teams.ChannelAccount[]) => {
            accounts.forEach((account: teams.ChannelAccount) => {
                console.log(account);
            });
        }).catch((error: any) => {
            console.log('oops!');
        });
    }
}