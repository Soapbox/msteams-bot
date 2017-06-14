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
        let botAdded = data.membersAdded &&
            data.membersAdded[0] &&
            data.membersAdded[0].id == data.address.bot.id;

        if (botAdded) {
            Logger.log('actions.conversationUpdate.listener', 'Bot added, adding all members to all channels.');
            (new CreateChannel((<IConversationUpdate> data)))
                .handle();
        } else {
            Logger.log('actions.conversationUpdate.listener', 'Detected a conversation update, not sure what to do.');
            console.log(data);
        }
    }
}