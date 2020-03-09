import { createAction, props } from '@ngrx/store';
import { Example } from '../models/example-model';
import { Roster } from '../models/roster';

export const getExamples = createAction('[Home] Get Examples');
export const examplesLoadedSuccess = createAction('[Home] Examples Loaded Success', props<{ examples: Example[] }>());
export const updateCurrentTeam = createAction('[Team] Update Current Team', props<{ team: string }>());
export const getRosters = createAction('[Team] Get Rosters', props<{ team: string }>());
export const rostersLoadedSuccess = createAction('[Team] Rosters Loaded Success', props<{ rosters: Roster[] }>());