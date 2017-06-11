import * as builder from 'botbuilder'
var sprintf = require('sprintf-js').sprintf;

export class Logger implements builder.IMiddlewareMap {
    private log(tag: string, message: string | undefined): void {
        if (message) {
            console.log(sprintf('%s: %s', tag, message));
        }
    }

    public readonly botbuilder = (session: builder.Session, next: Function): void => {
        this.log('inbound', session.message.text);
        next();
    }

    public readonly send = (event: builder.IEvent, next: Function): void => {
        this.log('outbound', (event as builder.IMessage).text);
        next();
    }
}