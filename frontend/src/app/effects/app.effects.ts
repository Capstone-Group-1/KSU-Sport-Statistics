import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ExampleApiService } from '../services/example-api.service';
import { Router } from '@angular/router';
import { getExamples, getRosters } from '../actions/app.action';
import { EMPTY } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private exampleApiService: ExampleApiService, private router: Router) {}

  getExamples$ = createEffect(() => this.actions$.pipe(
    ofType(getExamples),
      mergeMap(() => this.exampleApiService.getExamples()
        .pipe(
          map(examples => ({ type: '[Home] Examples Loaded Success', examples })),
          catchError((error) => {
            console.log(error);
            return EMPTY;
          }))
        ))
    );
}
