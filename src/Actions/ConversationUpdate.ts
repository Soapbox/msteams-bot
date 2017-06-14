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

    private wasTheBotAdded(data: IConversationUpdate): boolean {
        return data.membersAdded &&
            data.membersAdded[0] &&
            data.membersAdded[0].id == data.address.bot.id;
    }

    listener(data: any): void {
        if (this.wasTheBotAdded(data)) {
            Logger.log('actions.conversationUpdate.listener', 'Bot added, adding all members to all channels.');
            (new CreateChannel((<IConversationUpdate> data)))
                .handle();
        } else {
            Logger.log('actions.conversationUpdate.listener', 'Detected a conversation update, not sure what to do.');
            console.log(data);
        }
    }
}