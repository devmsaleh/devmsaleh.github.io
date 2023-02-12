import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  @Input() teams!:Team[];
 

  @Output() teamRemovedEvent = new EventEmitter<Team>();

  constructor() { }

  ngOnInit() {
  }

  doRemoveAction(team:Team){
    console.log("TeamListComponent doRemoveAction,team: "+team);
    this.teamRemovedEvent.emit(team);
    //this.teams.splice(index,1);
  }

}
