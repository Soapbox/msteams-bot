import * as builder from 'botbuilder'
import { ConversationUpdate } from './ConversationUpdate'
import { ContactRelationUpdate } from './ContactRelationUpdate'

export class Initializer {
    static initialize(bot: builder.UniversalBot): void {
        new ConversationUpdate(bot);
        new ContactRelationUpdate(bot);
    }
}