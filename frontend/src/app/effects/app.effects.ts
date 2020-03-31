import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { getExamples, getRosters, getCurrentTeamStats } from '../actions/app.action';
import { EMPTY } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private router: Router) { }

  getExamples$ = createEffect(() => this.actions$.pipe(
    ofType(getExamples),
    mergeMap(() => this.apiService.getExamples()
      .pipe(
        map(examples => ({ type: '[Home] Examples Loaded Success', examples })),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        }))
    ))
  );

  getRosters$ = createEffect(() => this.actions$.pipe(
    ofType(getRosters),
    mergeMap(() => this.apiService.getRosters()
      .pipe(
        map(rosters => ({ type: '[Team] Rosters Loaded Success', rosters })),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        }))
    ))
  );

  getCurrentTeamStats$ = createEffect(() => this.actions$.pipe(
    ofType(getCurrentTeamStats),
    mergeMap(() => this.apiService.getCurrentTeamStats()
      .pipe(
        map(stats => ({ type: '[Team] Current Team Stats Loaded Success', stats })),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        }))
    ))
  );
}
