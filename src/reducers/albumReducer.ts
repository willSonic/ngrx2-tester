import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Album } from '../models';
import { AlbumActions } from '../actions';


export interface  AlbumState {
    ids: string[];
    entities: { [id: string]: Album };
};

const initialState: AlbumState = {
    ids: [],
    entities: {}
};


export default function(state = initialState, action: Action): AlbumState {
              // console.log("[albumReducer.js]=---- AlbumState STATE=");
    switch (action.type) {

        case AlbumActions.SEARCH_COMPLETE_ALBUM:
        case AlbumActions.LOAD_COLLECTION_SUCCESS: {
               console.log("[albumReducer.js]=---- type= "+action.type);
                const albums: Album[] = action.payload;
                const newAlbums = albums.filter(album => !state.entities[album.id]);

                const newAlbumsIds = newAlbums.map(album => album.id);
                const newAlbumsEntities = newAlbums.reduce((entities: { [id: string]: Album }, album: Album) => {
                    return Object.assign(entities, {
                        [album.id]: album
                    });
                }, {});

               console.log("[albumReducer.js]=-AlbumAction.LOAD_COLLECTION_SUCCESS:--- newAlbumsEntities =", newAlbumsEntities);
                return {
                    ids: [ ...state.ids, ...newAlbumsIds ],
                    entities: Object.assign({}, state.entities, newAlbumsEntities)
                };
            }
        case AlbumActions.LOAD_ALBUM: {
          const album: Album = action.payload;

          if (state.ids.includes(album.id)) {
            return state;
          }

          return {
            ids: [ ...state.ids, album.id ],
            entities: Object.assign({}, state.entities, {
              [album.id]: album
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

export function getAlbum(id: string) {
  return (state$: Observable<AlbumState>) => state$
    .select(s => s.entities[id]);
};

export function getAlbums(albumIds: string[]) {
    return (state$: Observable<AlbumState>) => state$
        .let(getAlbumEntities())
        .map(entities => albumIds.map(id => entities[id]));
}

export function hasAlbum(id: string) {
  return (state$: Observable<AlbumState>) => state$
    .select(s => s.ids.includes(id));
}

