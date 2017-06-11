import * as builder from 'botbuilder'
import { Dialog } from './Dialog'

export class Echo extends Dialog {
    getDialogId(): string {
        return 'Echo';
    }

    getMatches(): string | RegExp | RegExp[] | string[] {
        return /^echo/i;
    }

    getActions(): builder.IDialogWaterfallStep | builder.IDialogWaterfallStep[] {
        return Echo.message;
    }

    private static async message(
        session: builder.Session
    ): Promise<void> {
        session.send("You said: %s", session.message.text);
    }
}