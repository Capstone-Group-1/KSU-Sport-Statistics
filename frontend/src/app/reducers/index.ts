import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApp from './app.reducer';

export interface State {
  [fromApp.appFeatureKey]: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromApp.appFeatureKey]: fromApp.reducer,
};

export const selectApp = (state: State) => state[fromApp.appFeatureKey];

export const getExamples = createSelector(selectApp, (state: fromApp.State) => state.examples);
export const getCurrentTeam = createSelector(selectApp, (state: fromApp.State) => state.currentTeam);
export const getRosters = createSelector(selectApp, (state: fromApp.State) => state.rosters);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
