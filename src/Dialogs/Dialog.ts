import * as builder from 'botbuilder'

export abstract class Dialog {
    abstract getDialogId(): string;

    abstract getMatches(): RegExp | RegExp[] | string | string[];

    abstract getActions(): builder.IDialogWaterfallStep | builder.IDialogWaterfallStep[];

    constructor(protected bot: builder.UniversalBot) {
        this.initialize();
    }

    protected initialize(): void {
        let newActionList = new Array<builder.IDialogWaterfallStep>();
        let actions = this.getActions();

        if (Array.isArray(actions)) {
            newActionList = newActionList.concat((actions as builder.IDialogWaterfallStep[]));
        } else {
            newActionList.push((actions as builder.IDialogWaterfallStep));
        }

        this.bot.dialog(this.getDialogId(), newActionList)
            .triggerAction({
                matches: this.getMatches(),
            });
    }
}