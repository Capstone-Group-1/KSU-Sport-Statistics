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
export const getPlayer = createAction('[Player] Get Player', props<{ id: number }>());
export const playerLoadedSuccess = createAction('[Player] Player Loaded Success', props<{ roster: Roster }>())
export const getPlayerStats = createAction('[Player] Get Player Stats', props<{ id: number }>());
export const playerStatsLoadedSuccess = createAction('[Player] Player Stats Loaded Success', props<{ stats: Stat[] }>())