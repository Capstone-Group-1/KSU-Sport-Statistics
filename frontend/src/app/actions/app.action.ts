import { createAction, props } from '@ngrx/store';
import { Example } from '../models/example-model';
import { Roster } from '../models/roster';
import { Stat } from '../models/stat';

export const getExamples = createAction('[Home] Get Examples');
export const examplesLoadedSuccess = createAction('[Home] Examples Loaded Success', props<{ examples: Example[] }>());
export const updateCurrentTeam = createAction('[Team] Update Current Team', props<{ team: string }>());
export const getRosters = createAction('[Team] Get Rosters');
export const rostersLoadedSuccess = createAction('[Team] Rosters Loaded Success', props<{ rosters: Roster[] }>());
export const getCurrentTeamStats = createAction('[Team] Get Current Team Stats');
export const currentTeamStatsSuccess = createAction('[Team] Current Team Stats Loaded Success', props<{ stats: Stat[] }>());