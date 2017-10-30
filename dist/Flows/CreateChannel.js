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
const Service_2 = require("../GoodTalk/Users/Service");
const Logger_1 = require("../Utilities/Logger");
class CreateChannel {
    constructor() { }
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
    addUsers(actor, channel, accounts) {
        return new Promise((resolve) => {
            (function loop() {
                return __awaiter(this, void 0, void 0, function* () {
                    for (let i = 0; i <= accounts.length; ++i) {
                        if (accounts[i]) {
                            // console.log(accounts[i]);
                            yield Service_2.Service.create(channel, actor, accounts[i]);
                        }
                    }
                    resolve();
                });
            })();
        });
    }
}
exports.CreateChannel = CreateChannel;
