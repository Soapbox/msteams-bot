import * as teams from "botbuilder-teams"
import * as builder from 'botbuilder'

export class Team extends teams.TeamsChatConnector {
    static instance: teams.TeamsChatConnector;

    public static initialize(connector: teams.TeamsChatConnector): void {
        Team.instance = connector;
    }

    public static getInstance(): teams.TeamsChatConnector {
        return Team.instance;
    }

    private constructor(connector: teams.TeamsChatConnector)
    {
        super(connector);
    }
}