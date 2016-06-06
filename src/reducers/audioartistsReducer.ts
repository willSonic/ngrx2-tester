import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { AudioArtist } from '../models';
import { AudioArtistActions } from '../actions';


export interface ArtistState {
    ids: number[];
    entities: { [id: number]: AudioArtist };
};

const initialState: ArtistState = {
    ids: [],
    entities: {}
};


export default function(state = initialState, action: Action): ArtistState {
    switch (action.type) {
        case AudioArtistActions.REQUEST_ARTISTS: {
            return state;
        }

        case AudioArtistActions.ARTIST_REQUEST_COMPLETE: {
            const artists: AudioArtist[] = action.payload;
            const newArtists = artists.filter(artist => !state.entities[artist.id]);

            const newArtistsIds = newArtists.map(artist => artist.id);
            const newArtistsEntities = newArtists.reduce((entities: { [id: string]: AudioArtist }, artist: Artist) => {
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


/*
iimport {Reducer, Action} from "@ngrx/store";


export const REQUEST_ARTISTS  = 'REQUEST_ARTISTS';
export const RECEIVED_ARTISTS = 'RECEIVED_ARTISTS';
export const RECEIVED_ERROR   = 'RECEIVED_ERROR';


export interface IArtist {
    id: number;
    artistName: string;
    trackTitle: string;
    albumImgSrc: string;
    trackURL:string;
}

export const artists: Reducer<{}> = (state: any = {}, action: Action) => {
    switch (action.type) {
        case REQUEST_ARTISTS:
             return state;
        case RECEIVED_ARTISTS:
            return Object.assign({},
                state,
                action.payload.reduce((obj, artist) => {
                    //console.log("artists - -", artist);
                    obj[artist.id] = artist;
                    return obj;
                }, {})
            );

        case RECEIVED_ERROR:
            return state;
        default:
            return state;
    }
};
*/
