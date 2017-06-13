import { IDialogWaterfallStep, Session } from 'botbuilder'
import { Dialog } from './Dialog'

export class Help extends Dialog {
    getDialogId(): string {
        return 'Help';
    }

    getMatches(): RegExp[] {
        return [
            /^help$/i
        ];
    }

    getActions(): IDialogWaterfallStep[] {
        return [
            Help.handle
        ];
    }

    private static async handle(session: Session): Promise<void> {
        session.endDialog("Need help?");
    }
}