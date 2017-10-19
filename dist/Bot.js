"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StripBotAtMentions_1 = require("./Interceptors/StripBotAtMentions");
const botbuilder_1 = require("botbuilder");
const Logger_1 = require("./Interceptors/Logger");
class Bot extends botbuilder_1.UniversalBot {
    static initialize(connector, settings) {
        Bot.bot = new Bot(connector, settings);
    }
    static getInstance() {
        return Bot.bot;
    }
    constructor(connector, settings) {
        super(connector, settings);
        // DialogInitializer.initialize(this);
        // ActionInitializer.initialize(this);
        this.use(new Logger_1.Logger());
        this.use(new StripBotAtMentions_1.StripBotAtMentions());
    }
}
exports.Bot = Bot;
