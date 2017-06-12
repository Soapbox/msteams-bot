"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sessions {
    static load(bot, address) {
        return new Promise((resolve, reject) => {
            bot.loadSession(address, (err, session) => {
                if (!err) {
                    resolve(session);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
exports.Sessions = Sessions;
