import { Action } from './Action'
import { Logger } from '../Interceptors/Logger'
import { Channels } from '../Handlers/Channels'
import * as builder from 'botbuilder'

export class ConversationUpdate extends Action {
    getAction(): string {
        return 'conversationUpdate';
    }

    listener(data: any): void {
        Logger.log('members-added', 'Adding members to channels.');
        Channels.addMembers(this, data);
    }
}