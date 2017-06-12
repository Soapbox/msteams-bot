import { Action } from './Action'
import { Logger } from '../Interceptors/Logger'
import { Channels } from '../Handlers/Channels'
import * as builder from 'botbuilder'

export class ContactRelationUpdate extends Action {
    getAction(): string {
        return 'contactRelationUpdate';
    }

    listener(data: any): void {
        let action = data.action;

        if (action === 'add') {
            Logger.log('bot-added', 'Creating a channel for the team.');
            Channels.create(this, data);
        }
    }
}