import * as builder from 'botbuilder'
import { Echo } from './Echo';

export class Initializer {
    static initialize(bot: builder.UniversalBot): void {
        new Echo(bot);
    }
}