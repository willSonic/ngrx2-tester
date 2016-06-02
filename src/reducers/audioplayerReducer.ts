import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { AudioItem } from '../models';
import { AudioPlayerActions } from '../actions';



export interface AudioPlayerState {
    id: string;
    loading:boolean
};

const initialState: AudioPlayerState = {
     id: undefined,
     loading:false
};


export default function(state = initialState, action: Action): AudioPlayerState {
    switch (action.type) {

        case AudioPlayerActions.LOAD_PLAYER: {
              const audioItem = action.payload;
              return   Object.assign(state,{
                                            id:audioItem.id,
                                            loading: true
                                           });
        }

        case AudioPlayerActions.LOAD_PLAYER_COMPLETE: {
              const audioItem:AudioItem = action.payload;
              return   Object.assign(state,{
                                            id:audioItem.id,
                                            loading: true
                                           });
        }

        case AudioPlayerActions.PLAYER_START: {
            return state;
        }

        case AudioPlayerActions.PLAYER_STOP: {
            return state;
        }

        case AudioPlayerActions.UPDATE_TIME: {
            return state;
        }

        case AudioPlayerActions.UPDATE_VOLUME: {
            return state;
        }

        default: {
            return state;
        }
    }
}



export function getStatus() {
  return (state$: Observable<AudioPlayerState>) => state$;
}

export function getAudioItemId() {
  return (state$: Observable<AudioPlayerState>) => state$;
}



/*import {Reducer, Action} from "@ngrx/store";
import {audioItem, IAudiodata} from "./audioReducer";
export const PLAY_INITIATED = 'PLAY_INITIATED';
export const PLAY_START = 'PLAY_START';
export const PLAY_STOP = 'PLAY_STOP';
export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE';
export const UPDATE_TIME = 'UPDATE_TIME';
export const VOLUME = 'VOLUME';


export interface IAudioPlayer {
                  elapsedTime:number,
                  audioId:string,
                  isPlaying:boolean,
                  volume:number
                 }

const initialState: IAudioPlayer = {
                  elapsedTime:0,
                  audioId:undefined,
                  isPlaying:false,
                  volume:0.8
                 }


export const audioPlayer: Reducer<IAudioPlayer> = (state: IAudioPlayer = initialState, action: Action) => {
    switch (action.type) {
        case PLAY_INITIATED:
                console.log("audioplayerReducer - PLAY_INITIATED - state =", state);
                return state;
        case PLAY_START:
                return state;
        case PLAY_STOP:
                return state;
        case TOGGLE_PLAY_PAUSE:
                return state;
        case UPDATE_TIME:
                return state;
        case VOLUME:
                return state;
        default:
             console.log("audioplayerReducer - DEFAULT - state =", state);
            return state;
    }
};
*/