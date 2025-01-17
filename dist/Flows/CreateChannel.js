"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("../GoodTalk/Channels/Service");
const Channels_1 = require("../Microsoft/Channels");
const Accounts_1 = require("../Microsoft/Accounts");
const botbuilder_1 = require("botbuilder");
const Logger_1 = require("../Utilities/Logger");
const sprintf_js_1 = require("sprintf-js");
const Bot_1 = require("../Bot");
class CreateChannel {
    constructor(data) {
        this.data = data;
        this.userId = '';
        this.channelId = '';
        this.channelId = data.address.conversation.id;
        this.userId = data.user.id;
    }
    getMicrosoftUser(userId, data) {
        let usersList = Accounts_1.Accounts.list(data);
        return new Promise((resolve, reject) => {
            usersList.then((accounts) => {
                accounts.forEach((account) => {
                    if (account.id == userId) {
                        resolve(account);
                        return;
                    }
                });
                // This line gets hit, I'm not sure why.
                Logger_1.Logger.debug('flows.createChannel.getMicrosoftUser', 'Could not find the requested microsoft user.');
                reject(new Error('Could not find requested microsoft user.'));
            }).catch((error) => {
                Logger_1.Logger.debug('flows.createChannel.getMicrosoftUser', 'Could not list microsoft users.');
                reject(error);
            });
        });
    }
    greetNotificationMicrosoftChannel(user, data) {
        let message = new botbuilder_1.Message();
        message.address(this.data.address);
        message.text(sprintf_js_1.sprintf("Hello @%s!! @%s has invited me here to set up your GoodTalk team! 😁 \n" +
            "I'll let you know when everything is ready.", data.sourceEvent.team.name, user.givenName));
        Bot_1.Bot.getInstance().send(message);
    }
    getMicrosoftChannel(channelId, data) {
        let channelsList = Channels_1.Channels.list(data.sourceEvent.team.id, data);
        return new Promise((resolve, reject) => {
            channelsList.then((channels) => {
                channels.forEach((channel) => {
                    if (channel.id == channelId) {
                        resolve(channel);
                        return;
                    }
                });
                Logger_1.Logger.debug('flows.createChannel.getMicrosoftChannel', 'Could not find requested microsoft channel.');
                reject(new Error('Could not find requested microsoft channel.'));
            }).catch((error) => {
                Logger_1.Logger.debug('flows.createChannel.getMicrosoftChannel', 'Could not list microsoft channels.');
                reject(error);
            });
        });
    }
    createGoodTalkChannel(channel) {
        let result = Service_1.Service.createOrFind(channel);
        return new Promise((resolve, reject) => {
            result.then((channel) => {
                resolve(channel);
            }).catch((error) => {
                Logger_1.Logger.debug('flows.createChannel.createGoodTalkChannel', 'Could not create channel on GoodTalk.');
                reject(error);
            });
        });
    }
    addUsers(channel) {
        let usersList = Accounts_1.Accounts.list(this.data);
        return new Promise((resolve, reject) => {
            usersList.then((accounts) => {
                console.log(accounts);
                accounts.forEach((account) => {
                    // Add the user on GoodTalk, and add it to our channel.
                });
                resolve(channel);
            }).catch((error) => {
                Logger_1.Logger.debug('flows.createChannel.addUsers', 'Could not list microsoft accounts.');
                reject(error);
            });
        });
    }
    doneNotificationMicrosoftChannel() {
        let message = new botbuilder_1.Message();
        message.address(this.data.address);
        message.text("Good news everybody!! Your channel is now set up on GoodTalk. To add a new agenda " +
            "item, in the channel say: `@goodtalk add [Your discussion item]`");
        Bot_1.Bot.getInstance().send(message);
    }
    handle() {
        let self = this;
        self.getMicrosoftUser(self.userId, self.data)
            .then((user) => {
            Logger_1.Logger.log('flows.createChannel.handle', 'Found the Microsoft user.');
            self.greetNotificationMicrosoftChannel(user, self.data);
            return self.getMicrosoftChannel(self.channelId, self.data);
        }).then((channel) => {
            Logger_1.Logger.log('flows.createChannel.handle', 'Found the Microsoft channel.');
            return self.createGoodTalkChannel(channel);
        }).then((channel) => {
            Logger_1.Logger.log('flows.createChannel.handle', 'Created the channel on GoodTalk.');
            console.log(channel);
            return self.addUsers(channel);
        }).then((channel) => {
            console.log(channel);
            self.doneNotificationMicrosoftChannel();
        }).catch((error) => {
            Logger_1.Logger.debug('flows.channelCreated.handle', 'Could not handle create channel.');
        });
    }
}
exports.CreateChannel = CreateChannel;
