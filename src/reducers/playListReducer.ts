import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import {AudioTrack, PlayList } from '../models';
import { PlayListActions } from '../actions';


export interface PlayListState {
    audioTrackList:AudioTrack[]
};

const initialState: PlayListState = {
    audioTrackList: []
};


export default function(state = initialState, action: Action): PlayListState {
    switch (action.type) {
        case PlayListActions.ADD_AUDIOTRACK:{
               console.log("[audioTrackListReducer.js]=--ADD_AUDIOTRACK-- action.payload= ",action.payload);
                  const audioTrack: AudioTrack  = action.payload;
                  if (state.audioTrackList.includes(audioTrack)) {
                    return state;
                  }
                  return Object.assign({}, state, {
                    audioTrackList: [ ...state.audioTrackList, audioTrack ]
                  });
            }
        case PlayListActions.REMOVE_AUDIOTRACK:{
               console.log("[playListReducer.js]=--REMOVE_AUDIOTRACK-- action.payload= "+action.payload);
                  const audioTrackToRemove: AudioTrack  = action.payload;

                  return Object.assign({}, state, {
                         audioTrackList: state.audioTrackList.filter(audioTrack => audioTrack.album.id !== audioTrackToRemove.album.id)
                  });
            }
        case PlayListActions.ADD_AUDIOTRACK_LIST:{
            console.log("[playListReducer.js]=--ADD_AUDIOTRACK_LIST-- action.payload= ",action.payload);
            const audioTracks: AudioTrack[]  = action.payload;


            return Object.assign({}, state, {
                audioTrackList: [ ...state.audioTrackList, ...audioTracks ]
            });
        }
        default: {
            return state;
        }
    }
}


export function getPlayList() {
    return (state$: Observable<PlayListState>) => state$
        .select(s => s.audioTrackList);
};


