import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamSelectComponent as TeamSelectComponent } from './teams/team-select/team-select.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamGameResultsComponent } from './teams/team-game-results/team-game-results.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamSelectComponent,
    TeamListComponent,
    TeamDetailsComponent,
    TeamGameResultsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
