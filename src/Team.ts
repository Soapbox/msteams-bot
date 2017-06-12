import * as teams from "botbuilder-teams"
import * as builder from 'botbuilder'

export class Team extends teams.TeamsChatConnector {
    static instance: teams.TeamsChatConnector;

    public static initialize(connector: builder.IChatConnectorSettings): void {
        Team.instance = new teams.TeamsChatConnector(connector);
    }

    public static getInstance(): teams.TeamsChatConnector {
        return Team.instance;
    }

    private constructor(connector: builder.IChatConnectorSettings)
    {
        super(connector);
    }
}