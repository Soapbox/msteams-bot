import { Logger } from '../Utilities/Logger'
import { Action } from './Action'

export class ContactRelationUpdate extends Action {
    getAction(): string {
        return 'contactRelationUpdate';
    }

    listener(data: any): void {
        console.log(data);
        let action = data.action;

        if (action === 'add') {
            Logger.log('bot-added', 'Creating a channel for the team.');
        }
    }
}