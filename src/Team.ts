import { TeamsChatConnector } from "botbuilder-teams"

export class Team extends TeamsChatConnector {
    static instance: TeamsChatConnector;

    public static initialize(connector: TeamsChatConnector): void {
        Team.instance = connector;
    }

    public static getInstance(): TeamsChatConnector {
        return Team.instance;
    }

    // private constructor(connector: TeamsChatConnector)
    // {
    //     super(connector);
    // }
}
