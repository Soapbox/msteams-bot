import * as builder from 'botbuilder'
import { Dialog } from './Dialog'

export class Default extends Dialog {
    getDialogId(): string {
        return '/';
    }

    getMatches(): RegExp[] {
        return [];
    }

    getActions(): builder.IDialogWaterfallStep[] {
        return [
            Default.handle
        ];
    }

    private static async handle(session: builder.Session): Promise<void> {
        session.endDialog();
    }

    protected initialize(): void {
        let newActionList = new Array<builder.IDialogWaterfallStep>();

        newActionList = newActionList.concat(
            (this.getActions() as builder.IDialogWaterfallStep[])
        );

        this.bot.dialog(this.getDialogId(), newActionList);
    }
}