import * as builder from "botbuilder"
import { Logger } from './Interceptors/Logger'

export class Bot extends builder.UniversalBot {
    constructor(connector: builder.ChatConnector, settings: any)
    {
        super(connector, settings);

        this.use({
            botbuilder: function (session, next) {
                Logger.log('inbound', session.message.text);
                next();
            },
            send: function(event, next) {
                if (event.type === 'message') {
                    Logger.log('outbound', (event as builder.IMessage).text);
                }
                next();
            }
        })
    }
}