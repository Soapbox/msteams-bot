import * as builder from "botbuilder"
import { Initializer as DialogInitializer } from './Dialogs/Initializer'
import { Initializer as ActionInitializer } from './Actions/Initializer'
import { Logger } from './Interceptors/Logger'

export class Bot extends builder.UniversalBot {
    constructor(connector: builder.ChatConnector, settings: any)
    {
        super(connector, settings);

        DialogInitializer.initialize(this);
        ActionInitializer.initialize(this);

        this.use(new Logger());
    }
}