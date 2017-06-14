import { IDialogWaterfallStep, Session } from 'botbuilder'
import { Dialog } from './Dialog'

export class GreetUser extends Dialog {
    getDialogId(): string {
        return 'GreetUser';
    }

    getMatches(): RegExp[] {
        return [];
    }

    getActions(): IDialogWaterfallStep[] {
        return [
            GreetUser.handle
        ];
    }

    private static async handle(session: Session): Promise<void> {
        session.endDialog("Why does work?");
    }
}