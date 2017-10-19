import { Initializer as DialogInitializer } from './Dialogs/Initializer'
import { Initializer as ActionInitializer } from './Actions/Initializer'
import { StripBotAtMentions } from './Interceptors/StripBotAtMentions'
import * as builder from "botbuilder"
import { Logger } from './Interceptors/Logger'
import * as teamBuilder from 'botbuilder-teams';

export class Bot extends builder.UniversalBot {
    static bot: builder.UniversalBot;

    public static initialize(connector: builder.ChatConnector, settings: any): void {
        Bot.bot = new Bot(connector, settings);

        connector.onInvoke(function(events, callback) {
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

    public static getInstance(): builder.UniversalBot {
        return Bot.bot;
    }

    private constructor(connector: builder.ChatConnector, settings: any)
    {
        super(connector, settings);

        DialogInitializer.initialize(this);
        ActionInitializer.initialize(this);

        this.use(new Logger());
        this.use(new StripBotAtMentions());
    }
}
