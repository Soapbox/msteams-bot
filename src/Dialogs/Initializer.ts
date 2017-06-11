import * as builder from 'botbuilder'
import { Default } from './Default'
import { Echo } from './Echo';

export class Initializer {
    static initialize(bot: builder.UniversalBot): void {
        new Default(bot);
        new Echo(bot);
    }
}