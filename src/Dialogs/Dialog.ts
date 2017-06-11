import * as builder from 'botbuilder'

export abstract class Dialog {
    abstract getDialogId(): string;

    abstract getMatches(): RegExp[];

    abstract getActions(): builder.IDialogWaterfallStep[];

    constructor(protected bot: builder.UniversalBot) {
        this.initialize();
    }

    protected initialize(): void {
        let newActionList = new Array<builder.IDialogWaterfallStep>();

        newActionList = newActionList.concat(
            (this.getActions() as builder.IDialogWaterfallStep[])
        );

        this.bot.dialog(this.getDialogId(), newActionList)
            .triggerAction({
                matches: this.getMatches(),
            });
    }
}