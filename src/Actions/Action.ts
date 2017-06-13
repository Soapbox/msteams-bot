import { UniversalBot } from 'botbuilder'

export abstract class Action {
    abstract getAction(): string;

    abstract listener(data: any): void;

    constructor(protected bot: UniversalBot) {
        this.initialize();
    }

    protected initialize(): void {
        this.bot.on(this.getAction(), this.listener);
    }
}