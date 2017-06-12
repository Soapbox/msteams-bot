import * as builder from 'botbuilder'
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

    getActions(): builder.IDialogWaterfallStep[] {
        return [
            Help.handle
        ];
    }

    private static async handle(session: builder.Session): Promise<void> {
        session.endDialog("Need help?");
    }
}