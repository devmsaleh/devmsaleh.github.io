import { Team } from "./team.model";

export interface TeamGameResult {
    homeTeamScore : number;
    visitorTeamScore : number;
    homeTeam : Team;
    visitorTeam : Team;
    resultLabel : string;
}
