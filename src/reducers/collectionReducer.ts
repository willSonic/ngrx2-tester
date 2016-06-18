import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AlbumActions } from '../actions';
import { Album } from '../models';


export interface CollectionState {
  loaded: boolean;
  loading: boolean;
  trackIds: string[];
};

const initialState: CollectionState = {
  loaded: false,
  loading: false,
  trackIds: []
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
        trackIds: album.map(album => album.trackId)
      };
    }

    case AlbumActions.ADD_TO_COLLECTION_SUCCESS:
    case AlbumActions.REMOVE_FROM_COLLECTION_FAIL: {
      const album: Album = action.payload;

      if (state.trackIds.includes(album.trackId)) {
        return state;
      }

      return Object.assign({}, state, {
        trackIds: [ ...state.trackIds, album.trackId ]
      });
    }

    case AlbumActions.REMOVE_FROM_COLLECTION_SUCCESS:
    case AlbumActions.ADD_TO_COLLECTION_FAIL: {
      const album: Album = action.payload;

      return Object.assign({}, state, {
        trackIds: state.trackIds.filter(trackId => trackId !== album.trackId)
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

export function getAlbumsTrackIds() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.trackIds);
}


export function isAlbumInCollection(trackId: string) {
  return (state$: Observable<CollectionState>) => state$
    .let(getAlbumsTrackIds())
    .map(trackIds => trackIds.includes(trackId));
}
