import {Reducer, Action} from "@ngrx/store";
import {uuid} from "../../util/uuid"

export const CREATE_AUDIODATA= 'CREATE_AUDIODATA';
export const REQUEST_AUDIODATA = 'REQUEST_AUDIODATA';
export const RECEIVED_AUDIODATA = 'RECEIVED_AUDIODATA';


export interface IAudiodata {
    id:string;
    artistId:number;
    artistAudioBuffer: ArrayBuffer;
    downloadComplete:boolean;
    isPlaying:boolean;
    currentPosition:number;
}

const initalAudioData: IAudiodata = {
            id:undefined,
            artistId:null,
            artistAudioBuffer:null,
            downloadComplete:false,
            isPlaying:false,
            currentPosition:0
     }

export const audioItem: Reducer<IAudiodata> = (state: IAudiodata = initalAudioData, action: Action) => {
    switch (action.type) {
        case CREATE_AUDIODATA:
             return Object.assign({},
                                  state,
                                  action.payload = Object.assign({},{
                                                                     id:uuid(),
                                                                     artistId:action.payload.id,
                                                                     artistAudioBuffer:null,
                                                                     downloadComplete:false,
                                                                     isPlaying:false,
                                                                     currentPosition:0
                                                                 }));

        case RECEIVED_AUDIODATA:
            return Object.assign({},
                                    state,
                                    action.payload
                                    );

        default:
            return state;
    }
};

