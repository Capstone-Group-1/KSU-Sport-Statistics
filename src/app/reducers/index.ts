import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApp from './app.reducer';
import * as AppActions from '../actions/app.action';

export interface State {
  [fromApp.appFeatureKey]: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromApp.appFeatureKey]: fromApp.reducer,
};

export const selectApp = (state: State) => state[fromApp.appFeatureKey];

export const getExamples = createSelector(selectApp, (state: fromApp.State) => state.examples);
export const getCurrentTeam = createSelector(selectApp, (state: fromApp.State) => {
  if (state.currentTeam == "") {
    return localStorage.getItem('team');
  }
  return state.currentTeam;
});
export const getRosters = createSelector(selectApp, (state: fromApp.State) => state.rosters);
export const getTeamStats = createSelector(selectApp, (state: fromApp.State) => state.teamStats);
export const getPlayer = createSelector(selectApp, (state: fromApp.State) => state.player);
export const getPlayerStats = createSelector(selectApp, (state: fromApp.State) => state.playerStats);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
