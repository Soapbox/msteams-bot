import { IEvent, IMessage, IMiddlewareMap, Session } from 'botbuilder'
import { Logger as ConsoleLogger } from '../Utilities/Logger'

export class Logger implements IMiddlewareMap {
    public readonly botbuilder = (session: Session, next: Function): void => {
        ConsoleLogger.debug('inbound', session.message.text);
        next();
    }

    public readonly send = (event: IEvent, next: Function): void => {
        ConsoleLogger.debug('outbound', (event as IMessage).text);
        next();
    }
}