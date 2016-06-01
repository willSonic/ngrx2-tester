import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { AudioItem } from '../models';
import { AudioPlayer } from '../actions';


export interface ArtistState {
    ids: string[];
    entities: { [id: number]: Artist };
};

const initialState: ArtistState = {
    ids: [],
    entities: {}
};


export default function(state = initialState, action: Action): ArtistState {
    switch (action.type) {
        case ArtistActions.REQUEST_ARTISTS: {
            return state;
        }

        case ArtistActions.ARTIST_REQUEST_COMPLETE: {
            const artists: Artist[] = action.payload;
            const newArtists = artists.filter(artist => !state.entities[artist.id]);

            const newArtistsIds = newArtists.map(book => book.id);
            const newArtistsEntities = newArtists.reduce((entities: { [id: string]: Artist }, artist: Artist) => {
                return Object.assign(entities, {
                    [artist.id]: artist
                });
            }, {});

            return {
                ids: [ ...state.ids, ...newArtistsIds ],
                entities: Object.assign({}, state.entities, newArtistsEntities)
            };
        }

        default: {
            return state;
        }
    }
}


export function getArtistEntities() {
    return (state$: Observable<ArtistState>) => state$
        .select(s => s.entities);
};


export function getArtists(artistIds: string[]) {
    return (state$: Observable<ArtistState>) => state$
        .let(getArtistEntities())
        .map(entities => artistIds.map(id => entities[id]));
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