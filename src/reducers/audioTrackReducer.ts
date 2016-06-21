import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { uuid } from '../util/uuid';

import { Album, AudioTrack} from '../models';
import { AudioTrackActions } from '../actions';


export interface  AudioTrackState {
    ids: string[],
    entities: { [id: string]: AudioTrack}
};

const initialState: AudioTrackState = {
    ids: [],
    entities: {}
};


export default function(state = initialState, action: Action): AudioTrackState {
              // console.log("[albumReducer.js]=---- AlbumState STATE=");
    switch (action.type) {
        case AudioTrackActions.CREATE_AUDIOTRACK_FROM_COLLECTION:{
               console.log("[addtrackReducer.js]=--CREATE_AUDIOTRACK_FROM_COLLECTION-- action.payload= ", action.payload);
                  const audioTracks: AudioTrack[] = action.payload.map((album) => Object.assign( {}, {id:uuid(),
                          album:album,
                          artistAudioBuffer: null,
                          downloadComplete:false,
                          isPlaying:false,
                          currentPosition:0})
                  );
                  const newAudioTracks = audioTracks.filter(audioTrack => !state.entities[audioTrack.id]);

                  const newAudioTrackIds = newAudioTracks.map(audioTrack => audioTrack.id);

                  const newAudioTrackEntities = newAudioTracks.reduce((entities: { [id: string]: AudioTrack }, audioTrack: AudioTrack) => {
                    return Object.assign(entities, {
                           [audioTrack.id]: audioTrack
                        });
                    }, {});

               console.log("[addtrackReducer.js]=--CREATE_AUDIOTRACK_FROM_COLLECTION-- newAudioTrackEntities= ", newAudioTrackEntities);
                 return {
                    ids: [ ...state.ids, ...newAudioTrackIds ],
                    entities: Object.assign({}, state.entities, newAudioTrackEntities)
                };
            }
            
         default: {
            return state;
        }
    }
}


export function getAudioTracksEntities() {
    return (state$: Observable<AudioTrackState>) => state$
        .select(s => s.entities);
};


