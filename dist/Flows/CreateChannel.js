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
const Accounts_1 = require("../Microsoft/Accounts");
const Service_2 = require("../GoodTalk/Users/Service");
const botbuilder_teams_1 = require("botbuilder-teams");
const Logger_1 = require("../Utilities/Logger");
class CreateChannel {
    constructor(data) {
        this.data = data;
        this.userId = '';
        this.channelId = '';
        this.tenantId = '';
        this.channelId = data.address.conversation.id;
        this.userId = data.user.id;
        this.tenantId = data.sourceEvent.tenant.id;
        this.channel = new botbuilder_teams_1.ChannelInfo(data.sourceEvent.channel.name, data.sourceEvent.channel.id);
    }
    handle() {
        let self = this;
        self.getMicrosoftUser(self.userId, self.data)
            .then((u) => {
            self.user = u;
            return self.createGoodTalkChannel(self.tenantId, self.user, self.channel);
        })
            .then((channel) => {
            return self.addUsers(self.user, self.channel);
        })
            .then(function () {
            console.log('i dunno lol probably finished');
        });
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
        console.log('adding users');
        let usersList = Accounts_1.Accounts.list(this.data);
        return new Promise((resolve) => {
            usersList.then((accounts) => {
                console.log(accounts);
                (function loop() {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (let i = 0; i <= accounts.length; ++i) {
                            if (accounts[i]) {
                                console.log(accounts[i]);
                                yield Service_2.Service.create(channel, actor, accounts[i]);
                            }
                        }
                        resolve();
                    });
                })();
            });
        });
    }
}
exports.CreateChannel = CreateChannel;
