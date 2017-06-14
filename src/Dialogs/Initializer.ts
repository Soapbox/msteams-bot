import { UniversalBot } from 'botbuilder'
import { GreetUser } from './GreetUser'
import { Default } from './Default'
import { Help } from './Help';

export class Initializer {
    static initialize(bot: UniversalBot): void {
        new Default(bot);
        new GreetUser(bot);
        new Help(bot);
    }
}