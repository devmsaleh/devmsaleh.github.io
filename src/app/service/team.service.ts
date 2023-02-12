import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Team } from 'src/app/model/team.model';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { TeamGameResult } from '../model/team.game.result.model';

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  teamsServiceURL = 'https://free-nba.p.rapidapi.com/teams';
  gamesResultsServiceURL = 'https://free-nba.p.rapidapi.com/games';

  dates : String [] = [];
  teamsArray: Team[] = [];

   get teams() {
    return this.teamsArray;
   }
  
   set teams(data) {
    this.teamsArray = data;
   }


  constructor(private httpClient: HttpClient ) { 
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        this.dates.push(d.toISOString().slice(0, 10));
    }
  }




  getTeams(): Observable<Team[]>{

    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key':  '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      })
    };
    
    
    return this.httpClient.get<Team[]>(this.teamsServiceURL,httpOptions).pipe(
       map((res:any)=>{
         return res.data.map((x:any)=>({
           id:x.id,
           abbreviation: x.abbreviation,
           city:x.city,
           conference: x.conference,
           division: x.division,
           name: x.name,
           fullName:x.full_name
         }))
       })
    )
 }

 getTeamLatestResults(teamId : number): Observable<TeamGameResult[]>{

  let queryParams = new HttpParams();
  
  queryParams = queryParams.append('page', 0);
  queryParams = queryParams.append('per_page', 12);
  queryParams = queryParams.append('team_ids[]', teamId);
  for (var i=1; i<=12; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    queryParams = queryParams.append('dates[]', d.toISOString().slice(0, 10));
}

  const httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key':  '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    }),
    params : queryParams
  };

  
    
  return this.httpClient.get<TeamGameResult[]>(this.gamesResultsServiceURL,httpOptions).pipe(
     map((res:any)=>{
       return res.data.map((x:any)=>({
         homeTeamScore:x.home_team_score,
         visitorTeamScore: x.visitor_team_score,
         homeTeam:x.home_team,
         visitorTeam: x.visitor_team,
         resultLabel: (x.home_team.id == teamId && x.home_team_score > x.visitor_team_score) 
                   || (x.visitor_team.id == teamId && x.visitor_team_score > x.home_team_score) ? 'W':'L'
       }))
     })
  )
}



private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}

}
