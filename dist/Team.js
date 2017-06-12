"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teams = require("botbuilder-teams");
class Team extends teams.TeamsChatConnector {
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
