import { IDialogResult, IDialogWaterfallStep, Session, UniversalBot } from 'botbuilder'

export abstract class Dialog {
    abstract getDialogId(): string;

    abstract getMatches(): RegExp[];

    abstract getActions(): IDialogWaterfallStep[];

    constructor(protected bot: UniversalBot) {
        this.initialize();
    }

    protected initialize(): void {
        let newActionList = new Array<IDialogWaterfallStep>();

        newActionList.push((session, args, next) => { 
            this.setDialogIdAsCurrent(session, args, next); 
        });

        newActionList = newActionList.concat(
            (this.getActions() as IDialogWaterfallStep[])
        );

        this.bot.dialog(this.getDialogId(), newActionList)
            .triggerAction({
                matches: this.getMatches(),
            });
    }

    private async setDialogIdAsCurrent(session: Session, args?: any | IDialogResult<any>, next?: (args?: IDialogResult<any>) => void): Promise<void> {
        session.conversationData.currentDialogName = this.getDialogId();

        if (next) {
            next(args);
        }
    }
}