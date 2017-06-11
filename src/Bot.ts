import * as builder from "botbuilder"
import { Dialogs } from './Dialogs/Dialogs'
import { Logger } from './Interceptors/Logger'

export class Bot extends builder.UniversalBot {
    constructor(connector: builder.ChatConnector, settings: any)
    {
        super(connector, settings);

        Dialogs.initialize();

        this.use(new Logger());
    }
}