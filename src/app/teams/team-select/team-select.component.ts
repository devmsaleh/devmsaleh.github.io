import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/model/team.model';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.css'] 
})
export class TeamSelectComponent implements OnInit {  

  @Output() teamSelectedEvent = new EventEmitter<Team>();
  teams : Team[] = [];
  selectedTeam!: Team;

  constructor(private teamService:TeamService) { } 

  ngOnInit() {
    this.teamService.getTeams().subscribe({
      next: (response: Team[]) => { 
        this.teams = response;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }

  

  trackTeam(){
    console.log('trackTeam button clicked'); 
    console.log(this.selectedTeam);
    this.teamSelectedEvent.emit(this.selectedTeam);
  }

}
