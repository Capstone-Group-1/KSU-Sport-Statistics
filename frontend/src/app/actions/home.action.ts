import { createAction, props } from '@ngrx/store';
import { Example } from '../models/example-model';

export const getExamples = createAction('[Home] Get Examples');
export const examplesLoadedSuccess = createAction('[Home] Examples Loaded Success', props<{ examples: Example[] }>());