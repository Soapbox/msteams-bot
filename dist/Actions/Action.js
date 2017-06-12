"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    constructor(bot) {
        this.bot = bot;
        this.initialize();
    }
    initialize() {
        this.bot.on(this.getAction(), this.listener);
    }
}
exports.Action = Action;
