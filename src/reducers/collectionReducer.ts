import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AlbumActions } from '../actions';
import { Album } from '../models';


export interface CollectionState {
  loaded: boolean;
  loading: boolean;
  ids: string[];
};

const initialState: CollectionState = {
  loaded: false,
  loading: false,
  ids: []
};

export default function(state = initialState, action: Action): CollectionState {
  switch (action.type) {
    case AlbumActions.LOAD_COLLECTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case AlbumActions.LOAD_COLLECTION_SUCCESS: {
      const album: Album[] = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: album.map(album => album.id)
      };
    }

    case AlbumActions.ADD_TO_COLLECTION_SUCCESS:
    case AlbumActions.REMOVE_FROM_COLLECTION_FAIL: {
      const album: Album = action.payload;

      if (state.ids.includes(album.id)) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, album.id ]
      });
    }

    case AlbumActions.REMOVE_FROM_COLLECTION_SUCCESS:
    case AlbumActions.ADD_TO_COLLECTION_FAIL: {
      const album: Album = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== album.id)
      });
    }

    default: {
      return state;
    }
  }
}


export function getLoaded() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loaded);
}

export function getLoading() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loading);
}

export function getAlbumsIds() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.ids);
}

export function isAlbumInCollection(id: string) {
  return (state$: Observable<CollectionState>) => state$
    .let(getAlbumsIds())
    .map(ids => ids.includes(id));
}
