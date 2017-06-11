import * as builder from "botbuilder"
import { Initializer } from './Dialogs/Initializer'
import { Logger } from './Interceptors/Logger'

export class Bot extends builder.UniversalBot {
    constructor(connector: builder.ChatConnector, settings: any)
    {
        super(connector, settings);

        Initializer.initialize(this);

        this.use(new Logger());
    }
}