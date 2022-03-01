import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface AppState {
  // currentUser: string;
}

export const reducers: ActionReducerMap<AppState> = {
  // currentUser: createReducer(
  //   '',
  //   on(/*Action*/, (state, action) => {
  //     return /* new State */
  //   })
  // )
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
