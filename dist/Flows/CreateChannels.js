"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("../GoodTalk/Channels/Service");
const Channels_1 = require("../Microsoft/Channels");
const Accounts_1 = require("../Microsoft/Accounts");
const Service_2 = require("../GoodTalk/Users/Service");
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
    getMicrosoftChannels(data) {
        let channelsList = Channels_1.Channels.list(data.sourceEvent.team.id, data);
        return new Promise((resolve, reject) => {
            channelsList.then((channels) => {
                resolve(channels);
            }).catch((error) => {
                Logger_1.Logger.debug('flows.createChannel.getMicrosoftChannel', 'Could not list microsoft channels.');
                reject(error);
            });
        });
    }
    createGoodTalkChannel(tenantId, actor, channel) {
        let result = Service_1.Service.create(tenantId, actor, channel);
        return new Promise((resolve, reject) => {
            result.then((response) => {
                resolve(channel);
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
                    let result = Service_2.Service.create(channel, actor, account);
                    result.then((response) => {
                        // Do nothing?
                    }).catch((error) => {
                        Logger_1.Logger.debug('add-user-failed', 'Could not create channel on GoodTalk.');
                    });
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
                self.getMicrosoftChannels(self.data)
                    .then((channels) => {
                    resolve({ user, channels });
                }).catch((error) => {
                    reject(error);
                });
            });
        }).then((result) => __awaiter(this, void 0, void 0, function* () {
            let asyncArray = [];
            result.channels.forEach((channel) => {
                asyncArray.push(self.createGoodTalkChannel(self.tenantId, result.user, result.channel));
                asyncArray.push(self.addUsers(result.user, channel));
            });
            let chain = Promise.resolve();
            for (let func of asyncArray) {
                chain = chain.then().catch((error) => {
                    console.log(error);
                });
            }
            self.doneNotificationMicrosoftChannel(result.user, self.data);
        })).catch((error) => {
            Logger_1.Logger.debug('flows.channelCreated.handle', 'Could not handle create channel.');
            console.log(error);
        });
    }
}
exports.CreateChannels = CreateChannels;
