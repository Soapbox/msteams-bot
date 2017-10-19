import { Initializer as DialogInitializer } from './Dialogs/Initializer'
import { Initializer as ActionInitializer } from './Actions/Initializer'
import { StripBotAtMentions } from './Interceptors/StripBotAtMentions'
import { ChatConnector, UniversalBot } from "botbuilder"
import { Logger } from './Interceptors/Logger'

export class Bot extends UniversalBot {
    static bot: UniversalBot;

    public static initialize(connector: ChatConnector, settings: any): void {
        Bot.bot = new Bot(connector, settings);
    }

    public static getInstance(): UniversalBot {
        return Bot.bot;
    }

    private constructor(connector: ChatConnector, settings: any)
    {
        super(connector, settings);

        // DialogInitializer.initialize(this);
        // ActionInitializer.initialize(this);

        this.use(new Logger());
        this.use(new StripBotAtMentions());
    }
}
