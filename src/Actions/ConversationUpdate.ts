import { CreateChannel } from '../Flows/CreateChannel'
import { IConversationUpdate } from 'botbuilder'
import { Logger } from '../Utilities/Logger'
import { Action } from './Action'

export class ConversationUpdate extends Action {
    getAction(): string {
        return 'conversationUpdate';
    }

    listener(data: any): void {
        console.log(data);
        
        if (data.membersAdded) {
            Logger.log('members-added', 'Adding members to channels.');
            (new CreateChannel((<IConversationUpdate> data)))
                .handle();
        }
    }
}