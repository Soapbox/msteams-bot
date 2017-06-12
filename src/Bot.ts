import * as builder from "botbuilder"
import { Initializer as DialogInitializer } from './Dialogs/Initializer'
import { Initializer as ActionInitializer } from './Actions/Initializer'
import { Logger } from './Interceptors/Logger'
import { StripBotAtMentions } from './Interceptors/StripBotAtMentions'

export class Bot extends builder.UniversalBot {
    static bot: builder.UniversalBot;

    public static initialize(connector: builder.ChatConnector, settings: any): void {
        Bot.bot = new Bot(connector, settings);
        console.log('BOT _ INIT');
        console.log(connector);
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