import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AudioArtistActions } from '../actions';
import { AudioArtist } from '../models';


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
    case AudioArtistActions.LOAD_COLLECTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case AudioArtistActions.LOAD_COLLECTION_SUCCESS: {
      const audioArtists: AudioArtist[] = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: audioArtists.map(audioArtist => audioArtist.id)
      };
    }

    case AudioArtistActions.ADD_TO_COLLECTION_SUCCESS:
    case AudioArtistActions.REMOVE_FROM_COLLECTION_FAIL: {
      const book: AudioArtist = action.payload;

      if (state.ids.includes(book.id)) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, book.id ]
      });
    }

    case AudioArtistActions.REMOVE_FROM_COLLECTION_SUCCESS:
    case AudioArtistActions.ADD_TO_COLLECTION_FAIL: {
      const book: AudioArtist = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== book.id)
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

export function getAudioArtistIds() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.ids);
}

export function isAudioArtistInCollection(id: string) {
  return (state$: Observable<CollectionState>) => state$
    .let(getAudioArtistIds())
    .map(ids => ids.includes(id));
}
