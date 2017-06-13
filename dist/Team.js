"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_teams_1 = require("botbuilder-teams");
class Team extends botbuilder_teams_1.TeamsChatConnector {
    static initialize(connector) {
        Team.instance = connector;
    }
    static getInstance() {
        return Team.instance;
    }
    constructor(connector) {
        super(connector);
    }
}
exports.Team = Team;
