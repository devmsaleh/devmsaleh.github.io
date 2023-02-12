import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { TeamGameResultsComponent } from './teams/team-game-results/team-game-results.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'teams', component: TeamsComponent},
  { path: 'results/:id/:fullName/:abbreviation/:conference', component: TeamGameResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
