import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {API_URL} from '../env';
import { Example } from '../models/example-model';
import { Roster } from '../models/roster';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  // GET list of examples
  getExamples(): Observable<Example[]> {
    return this.http
      .get<Example[]>(`${API_URL}/examples`).pipe(
        map(data => {
          return data;
        }),
        catchError(error => {
          return throwError(error);
        })
      )
  }

  getRosters(team: string): Observable<Roster[]> {
    let teamAcronym: string;
    switch (team) {
      case "Mens Basketball": {
        teamAcronym = "mbb";
        break;
      }
      case "Womens Basketball": {
        teamAcronym = "wbb";
        break;
      }
      case "Softball": {
        teamAcronym = "softball";
        break;
      }
      case "Baseball": {
        teamAcronym = "baseball";
        break;
      }
      default: {
        return throwError(`Invalid Sports Team: ${team}`);
      }
    }
    return this.http
      .get<Roster[]>(`${API_URL}/team/roster?sport=${teamAcronym}`).pipe(
        map(data => {
          return data;
        }),
        catchError(error => {
          return throwError(error);
        })
      )
  }
}