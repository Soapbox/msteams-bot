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

        newActionList.push((session, args, next) => { 
            this.setDialogIdAsCurrent(session, args, next); 
        });

        newActionList = newActionList.concat(
            (this.getActions() as builder.IDialogWaterfallStep[])
        );

        this.bot.dialog(this.getDialogId(), newActionList)
            .triggerAction({
                matches: this.getMatches(),
            });
    }

    private async setDialogIdAsCurrent(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> {
        session.conversationData.currentDialogName = this.getDialogId();

        if (next) {
            next(args);
        }
    }
}