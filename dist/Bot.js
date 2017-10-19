"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Initializer_1 = require("./Dialogs/Initializer");
const Initializer_2 = require("./Actions/Initializer");
const StripBotAtMentions_1 = require("./Interceptors/StripBotAtMentions");
const builder = require("botbuilder");
const Logger_1 = require("./Interceptors/Logger");
const teamBuilder = require("botbuilder-teams");
class Bot extends builder.UniversalBot {
    static initialize(connector, settings) {
        Bot.bot = new Bot(connector, settings);
        connector.onInvoke(function (events, callback) {
            let response = teamBuilder.ComposeExtensionResponse.result('list').attachments([
                new builder.ThumbnailCard()
                    .title('Prompting Questions')
                    .text('Lets add something to the agenda!')
                    .images([new builder.CardImage().url('https://soapbox-v4.s3.amazonaws.com/common/goodtalk/GoodTalk-Slack.png')])
                    .buttons([
                    new builder.CardAction().type('invoke').title('What was a win that you had last week?'),
                    new builder.CardAction().type('invoke').title('How do we, as a team, know when we have done good work?'),
                    new builder.CardAction().type('invoke').title('Who deserves a shoutout? What did they do?'),
                ])
                    .toAttachment()
            ]).toResponse();
            callback(null, response, 200);
        });
    }
    static getInstance() {
        return Bot.bot;
    }
    constructor(connector, settings) {
        super(connector, settings);
        Initializer_1.Initializer.initialize(this);
        Initializer_2.Initializer.initialize(this);
        this.use(new Logger_1.Logger());
        this.use(new StripBotAtMentions_1.StripBotAtMentions());
    }
}
exports.Bot = Bot;
