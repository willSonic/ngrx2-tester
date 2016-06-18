import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Album } from '../models';
import { AlbumActions } from '../actions';


export interface  AlbumState {
    trackIds: string[];
    entities: { [trackId: string]: Album };
};

const initialState: AlbumState = {
    trackIds: [],
    entities: {}
};


export default function(state = initialState, action: Action): AlbumState {
              // console.log("[albumReducer.js]=---- AlbumState STATE=");
    switch (action.type) {
        case AlbumActions.SEARCH_COMPLETE_FROM_AUDIOARTIST:{
               console.log("[albumReducer.js]=---- action.payload= "+action.payload);
                const albums: Album[] = action.payload.map(audioArtist =>audioArtist.album);
                const newAlbums = albums.filter(album => !state.entities[album.trackId]);

                const newAlbumsIds = newAlbums.map(album => album.trackId);
                const newAlbumsEntities = newAlbums.reduce((entities: { [trackId: string]: Album }, album: Album) => {
                    return Object.assign(entities, {
                        [album.trackId]: album
                    });
                }, {});

               console.log("[albumReducer.js]=-AlbumAction.LOAD_COLLECTION_SUCCESS:--- newAlbumsEntities =", newAlbumsEntities);
                return {
                    trackIds: [ ...state.trackIds, ...newAlbumsIds ],
                    entities: Object.assign({}, state.entities, newAlbumsEntities)
                };
            }
        case AlbumActions.SEARCH_COMPLETE_ALBUM:
        case AlbumActions.LOAD_COLLECTION_SUCCESS: {
               console.log("[albumReducer.js]=---- type= "+action.type);
                const albums: Album[] = action.payload;
                const newAlbums = albums.filter(album => !state.entities[album.trackId]);

                const newAlbumsIds = newAlbums.map(album => album.trackId);
                const newAlbumsEntities = newAlbums.reduce((entities: { [trackId: string]: Album }, album: Album) => {
                    return Object.assign(entities, {
                        [album.trackId]: album
                    });
                }, {});

               console.log("[albumReducer.js]=-AlbumAction.LOAD_COLLECTION_SUCCESS:--- newAlbumsEntities =", newAlbumsEntities);
                return {
                    trackIds: [ ...state.trackIds, ...newAlbumsIds ],
                    entities: Object.assign({}, state.entities, newAlbumsEntities)
                };
            }
        case AlbumActions.LOAD_ALBUM: {
          const album: Album = action.payload;

          if (state.trackIds.includes(album.trackId)) {
            return state;
          }

          return {
            trackIds: [ ...state.trackIds, album.trackId ],
            entities: Object.assign({}, state.entities, {
              [album.trackId]: album
            })
          };
        }
        default: {
            return state;
        }
    }
}


export function getAlbumEntities() {
    return (state$: Observable<AlbumState>) => state$
        .select(s => s.entities);
};

export function getAlbum(trackId: string) {
  return (state$: Observable<AlbumState>) => state$
    .select(s => s.entities[trackId]);
};

export function getAlbums(albumIds: string[]) {
    return (state$: Observable<AlbumState>) => state$
        .let(getAlbumEntities())
        .map(entities => albumIds.map(trackId => {
             return entities[trackId]
        }));
}

export function hasAlbum(trackId: string) {
  return (state$: Observable<AlbumState>) => state$
    .select(s => s.trackIds.includes(trackId));
}

