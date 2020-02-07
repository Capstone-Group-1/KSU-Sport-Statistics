import { Action, createReducer, on } from '@ngrx/store';
import { Example } from '../models/example-model';
import * as ExmapleApiActions from '../actions/home.action';

export const appFeatureKey = 'app';

export interface State {
    examples: Example[]
}

export const initialState: State = {
    examples: []
};

const appReducer = createReducer(
  initialState,

  on(ExmapleApiActions.examplesLoadedSuccess, (state: State, { examples }) => (
    {
      ...state,
      examples
    })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}