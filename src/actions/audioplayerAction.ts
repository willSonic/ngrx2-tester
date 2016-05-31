import {Action} from "@ngrx/store";
import { IAudiodata} from "../reducers/audioReducer";
export const PLAY_INITIATED = 'PLAY_INITIATED';


export const playAudioItem = (audioItem: IAudiodata) => {
     console.log(" playAudioItem -- audioItem =", audioItem);
    return <Action>{ type: PLAY_INITIATED, payload: audioItem };
}