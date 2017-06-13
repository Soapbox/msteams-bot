import { CreateChannel } from '../Flows/CreateChannel'
import { IConversationUpdate } from 'botbuilder'
import { Sessions } from '../Utilities/Sessions'
import { Logger } from '../Utilities/Logger'
import { Action } from './Action'
import { Bot } from '../Bot'

export class ConversationUpdate extends Action {
    getAction(): string {
        return 'conversationUpdate';
    }

    listener(data: any): void {
        let session = Sessions.load(Bot.getInstance(), data.address);
        console.log(session);
        console.log(data);
        
        if (data.membersAdded) {
            Logger.log('members-added', 'Adding members to channels.');
            (new CreateChannel((<IConversationUpdate> data)))
                .handle();
        }
    }
}