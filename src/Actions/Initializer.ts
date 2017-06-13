import { ContactRelationUpdate } from './ContactRelationUpdate'
import { ConversationUpdate } from './ConversationUpdate'
import { UniversalBot } from 'botbuilder'

export class Initializer {
    static initialize(bot: UniversalBot): void {
        new ConversationUpdate(bot);
        new ContactRelationUpdate(bot);
    }
}