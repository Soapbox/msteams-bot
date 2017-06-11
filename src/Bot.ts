import * as builder from "botbuilder"

export class Bot extends builder.UniversalBot {
    constructor(connector: builder.ChatConnector, settings: any)
    {
        super(connector, settings);
    }
}