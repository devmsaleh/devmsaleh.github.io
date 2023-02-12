import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamGameResult } from 'src/app/model/team.game.result.model';
import { Team } from 'src/app/model/team.model';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  @Input() team!:Team;
  @Output() teamRemovedEvent = new EventEmitter<Team>();
  gameResults! : TeamGameResult[];
  totalPointsScored: number = 0;
  totalPointsConceded: number = 0;
  avgPointsScored: number = 0;
  avgPointsConceded: number = 0;

  constructor(private teamService:TeamService) {

  }

  ngOnInit() {
    console.log("Init TeamDetailsComponent");
    console.log(this.team);
    this.getGameResults();
  }

  getGameResults(){
    this.teamService.getTeamLatestResults(this.team.id).subscribe({
      next: (response: TeamGameResult[]) => { 
        console.log(response);
        this.gameResults = response;
        for (var gameResultLoop of this.gameResults) {
          if(gameResultLoop.homeTeam.id == this.team.id){
            this.totalPointsScored = this.totalPointsScored + gameResultLoop.homeTeamScore;
            this.totalPointsConceded = this.totalPointsConceded + gameResultLoop.visitorTeamScore;
          }else{
            this.totalPointsScored = this.totalPointsScored + gameResultLoop.visitorTeamScore;
            this.totalPointsConceded = this.totalPointsConceded + gameResultLoop.homeTeamScore;
          }
        }
        this.avgPointsScored = Math.round(this.totalPointsScored / this.gameResults.length);
        this.avgPointsConceded = Math.round(this.totalPointsConceded / this.gameResults.length);
      },
      error: (e) => console.error(e)
    })
  }

  removeTeam(team:Team){
    console.log('TeamDetailsComponent removeTeam button clicked'); 
    this.teamRemovedEvent.emit(team);  
  }

}
