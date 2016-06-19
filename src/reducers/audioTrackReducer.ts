import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { uuid } from '../util/uuid';

import { Album, AudioTrack} from '../models';
import { AudioTrackActions } from '../actions';


export interface  AudioTrackState {
    audioTrackIds: string[],
    entities: { [audioTrackIds: string]: AudioTrack}
};

const initialState: AudioTrackState = {
    audioTrackIds: [],
    entities: {}
};


export default function(state = initialState, action: Action, audioTrack:AudioTrack): AudioTrackState {
              // console.log("[albumReducer.js]=---- AlbumState STATE=");
    switch (action.type) {
        case AudioTrackActions.CREATE_AUDIOTRACK_FROM_COLLECTION:{
               console.log("[addtrackReducer.js]=--CREATE_AUDIOTRACK_FROM_COLLECTION-- action.payload= "+action.payload);

                const newAudioTracks: AudioTrack[] = action.payload.map(audioArtist =>{
                                                                                         let newAudioTrack = new AudioTrack();
                                                                                         return Object.assign(newAudioTrack,
                                                                                                               {id:uuid(),
                                                                                                                album:audioArtist.album,
                                                                                                                artistAudioBuffer: null,
                                                                                                                downloadComplete:false,
                                                                                                                isPlaying:false,
                                                                                                                currentPosition:0});
                                                                                       });

                  const newAudioTrackIds = newAudioTracks.map(audioTrack => audioTrack.id);

                  const newAudioTrackEntities = newAudioTracks.reduce((entities: { [id: string]: AudioTrack }, audioTrack: AudioTrack) => {
                    return Object.assign(entities, {
                           [audioTrack.id]: audioTrack
                        });
                    }, {});

                 return {
                    audioTrackIds: [ ...state.audioTrackIds, ...newAudioTrackIds ],
                    entities: Object.assign({}, state.entities, newAudioTrackEntities)
                };
            }
            
         default: {
            return state;
        }
    }
}