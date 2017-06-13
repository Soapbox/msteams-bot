import * as builder from 'botbuilder'
var sprintf = require('sprintf-js').sprintf;
import { Logger as ConsoleLogger } from '../Utilities/Logger'

export class Logger implements builder.IMiddlewareMap {
    public readonly botbuilder = (session: builder.Session, next: Function): void => {
        ConsoleLogger.debug('inbound', session.message.text);
        next();
    }

    public readonly send = (event: builder.IEvent, next: Function): void => {
        ConsoleLogger.debug('outbound', (event as builder.IMessage).text);
        next();
    }
}