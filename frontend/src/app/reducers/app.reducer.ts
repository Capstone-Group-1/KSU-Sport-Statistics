import { Action, createReducer, on } from '@ngrx/store';
import { Example } from '../models/example-model';
import * as AppActions from '../actions/app.action';
import { Roster } from '../models/roster';

export const appFeatureKey = 'app';

export interface State {
    examples: Example[],
    rosters: Roster[],
    currentTeam: string
}

export const initialState: State = {
    examples: [],
    rosters: [],
    currentTeam: ""
};

const appReducer = createReducer(
  initialState,

  on(AppActions.examplesLoadedSuccess, (state: State, { examples }) => (
    {
      ...state,
      examples
    })
  ),

  on(AppActions.updateCurrentTeam, (state: State, { team }) => (
    {
      ...state,
      currentTeam: team
    }
  )),

  on(AppActions.rostersLoadedSuccess, (state: State, { rosters }) => (
    {
      ...state
      , rosters: rosters
    })
  ),

);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}