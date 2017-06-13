import { UniversalBot } from 'botbuilder'
import { Default } from './Default'
import { Help } from './Help';

export class Initializer {
    static initialize(bot: UniversalBot): void {
        new Default(bot);
        new Help(bot);
    }
}