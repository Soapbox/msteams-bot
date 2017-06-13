import { IDialogWaterfallStep, Session } from 'botbuilder'
import { Dialog } from './Dialog'

export class Default extends Dialog {
    getDialogId(): string {
        return '/';
    }

    getMatches(): RegExp[] {
        return [];
    }

    getActions(): IDialogWaterfallStep[] {
        return [
            Default.handle
        ];
    }

    private static async handle(session: Session): Promise<void> {
        session.endDialog();
    }

    protected initialize(): void {
        let newActionList = new Array<IDialogWaterfallStep>();

        newActionList = newActionList.concat(
            (this.getActions() as IDialogWaterfallStep[])
        );

        this.bot.dialog(this.getDialogId(), newActionList);
    }
}