import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamGameResult } from 'src/app/model/team.game.result.model';
import { TeamService } from 'src/app/service/team.service';

@Component({
  templateUrl: './team-game-results.component.html',
  styleUrls: ['./team-game-results.component.css']
})
export class TeamGameResultsComponent implements OnInit {

  teamId! : number;
  teamFullName!: string;
  teamAbbreviation!: string;
  teamConference!: string;
  gameResults! : TeamGameResult[];

  constructor(private route: ActivatedRoute,private teamService : TeamService) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['id'];
    this.teamFullName = this.route.snapshot.params['fullName'];
    this.teamAbbreviation = this.route.snapshot.params['abbreviation'];
    this.teamConference = this.route.snapshot.params['conference'];
    console.log("###### init TeamGameResultsComponent,id: "+this.teamId);
    this.getGameResults(this.teamId);
  }

  getGameResults(teamId:number){
    this.teamService.getTeamLatestResults(teamId).subscribe({
      next: (response: TeamGameResult[]) => { 
        console.log(response);
        this.gameResults = response;
      },
      error: (e) => console.error(e)
    })
  }

 

  

}
