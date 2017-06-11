import * as builder from 'botbuilder'
import { Dialog } from './Dialog'

export class Echo extends Dialog {
    getDialogId(): string {
        return 'Echo';
    }

    getMatches(): RegExp[] {
        return [
            /^echo/i
        ];
    }

    getActions(): builder.IDialogWaterfallStep[] {
        return [
            Echo.handle
        ];
    }

    private static async handle(
        session: builder.Session
    ): Promise<void> {
        session.endDialog("You said: %s", session.message.text);
    }
}