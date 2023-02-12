import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit { 

  
  teams: Team[] = [];
  router!: Router;

  doSelectAction(selectedTeam:Team){ 
    this.teamService.teams.push(selectedTeam);   
  }

  doRemoveAction(teamToRemove:Team){  
    this.teamService.teams.forEach((element,index)=>{
      if(element.id==teamToRemove.id)  this.teamService.teams.splice(index,1);
    });
  }

  

  constructor(private routerObj: Router,private teamService : TeamService) { 
    this.router = routerObj;  
    this.teams = this.teamService.teams;
  }
  
  

  ngOnInit() {
    console.log("########### init TeamsComponent ##########");
  }

}
