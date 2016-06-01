import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { AudioPlayerEffects } from './audioplayerEffects';


import { compose } from '@ngrx/core/compose';


import { storeLogger } from 'ngrx-store-logger';


import { combineReducers } from '@ngrx/store';




export default [
  AudioPlayerEffects
];
