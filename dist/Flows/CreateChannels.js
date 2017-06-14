"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("../GoodTalk/Channels/Service");
const Channels_1 = require("../Microsoft/Channels");
const Accounts_1 = require("../Microsoft/Accounts");
const Sessions_1 = require("../Utilities/Sessions");
const Logger_1 = require("../Utilities/Logger");
const sprintf_js_1 = require("sprintf-js");
const Bot_1 = require("../Bot");
class CreateChannels {
    constructor(data) {
        this.data = data;
        this.userId = '';
        this.channelId = '';
        this.tenantId = '';
        this.channelId = data.address.conversation.id;
        this.userId = data.user.id;
        this.tenantId = data.sourceEvent.tenant.id;
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
                reject(new Error('Could not find requested microsoft user.'));
            }).catch((error) => {
                Logger_1.Logger.debug('flows.createChannel.getMicrosoftUser', 'Could not list microsoft users.');
                reject(error);
            });
        });
    }
    greetUser(user, data) {
        let address = {
            channelId: data.address.channelId,
            user: {
                id: user.id
            },
            channelData: {
                tenant: {
                    id: data.sourceEvent.tenant.id
                }
            },
            bot: {
                id: data.address.bot.id,
                name: data.address.bot.name
            },
            serviceUrl: data.address.serviceUrl,
            useAuth: true
        };
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), address);
        session.then((session) => {
            session.send(sprintf_js_1.sprintf("Blurb about running better meetings with GoodTalk"));
            session.send(sprintf_js_1.sprintf("Blurb about setting up things in background and to wait"));
        }).catch((error) => {
            Logger_1.Logger.debug('flows.createChannel.greetUser', 'Could not create a new session.');
        });
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
                reject(new Error('Could not find requested microsoft channel.'));
            }).catch((error) => {
                Logger_1.Logger.debug('flows.createChannel.getMicrosoftChannel', 'Could not list microsoft channels.');
                reject(error);
            });
        });
    }
    createGoodTalkChannel(tenantId, actor, channel) {
        let result = Service_1.Service.create(tenantId, actor, channel);
        return new Promise((resolve, reject) => {
            result.then((success) => {
                if (success) {
                    resolve(channel);
                }
                else {
                    Logger_1.Logger.debug('flows.createChannel.createGoodTalkChannel', 'Failed at msteams brain api.');
                    reject(new Error('Failed at msteams brain api.'));
                }
            }).catch((error) => {
                Logger_1.Logger.debug('', 'Could not create channel on GoodTalk.');
                reject(error);
            });
        });
    }
    addUsers(actor, channel) {
        let usersList = Accounts_1.Accounts.list(this.data);
        return new Promise((resolve, reject) => {
            usersList.then((accounts) => {
                console.log(accounts);
                accounts.forEach((account) => {
                    // Add the user on GoodTalk, and add it to our channel.
                });
                resolve(actor);
            }).catch((error) => {
                Logger_1.Logger.debug('flows.createChannel.addUsers', 'Could not list microsoft accounts.');
                reject(error);
            });
        });
    }
    doneNotificationMicrosoftChannel(user, data) {
        let address = {
            channelId: data.address.channelId,
            user: {
                id: user.id
            },
            channelData: {
                tenant: {
                    id: data.sourceEvent.tenant.id
                }
            },
            bot: {
                id: data.address.bot.id,
                name: data.address.bot.name
            },
            serviceUrl: data.address.serviceUrl,
            useAuth: true
        };
        let session = Sessions_1.Sessions.load(Bot_1.Bot.getInstance(), address);
        session.then((session) => {
            session.send(sprintf_js_1.sprintf("Instructions on how to add tab app to team channel."));
        }).catch((error) => {
            Logger_1.Logger.debug('flows.createChannel.greetUser', 'Could not create a new session.');
        });
    }
    handle() {
        let self = this;
        self.getMicrosoftUser(self.userId, self.data)
            .then((user) => {
            Logger_1.Logger.log('flows.createChannel.handle', 'Found the Microsoft user.');
            self.greetUser(user, self.data);
            return new Promise((resolve, reject) => {
                self.getMicrosoftChannel(self.channelId, self.data)
                    .then((channel) => {
                    resolve({ user, channel });
                }).catch((error) => {
                    reject(error);
                });
            });
        }).then((result) => {
            Logger_1.Logger.log('flows.createChannel.handle', 'Found the Microsoft channel.');
            return new Promise((resolve, reject) => {
                self.createGoodTalkChannel(self.tenantId, result.user, result.channel)
                    .then((channel) => {
                    resolve({ user: result.user, channel });
                }).catch((error) => {
                    reject(error);
                });
            });
        }).then((result) => {
            Logger_1.Logger.log('flows.createChannel.handle', 'Created the channel on GoodTalk.');
            return self.addUsers(result.user, result.channel);
        }).then((user) => {
            self.doneNotificationMicrosoftChannel(user, self.data);
        }).catch((error) => {
            Logger_1.Logger.debug('flows.channelCreated.handle', 'Could not handle create channel.');
            console.log(error);
        });
    }
}
exports.CreateChannels = CreateChannels;
