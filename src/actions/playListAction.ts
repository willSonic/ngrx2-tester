import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { AudioTrack } from '../models';



@Injectable()
export class PlayListActions {
  static  ADD_AUDIOTRACK = '[PlayList] add AudioTrack to playlist';
      addAudioTrack(audioTrack: AudioTrack): Action {
        return {
          type: PlayListActions.ADD_AUDIOTRACK,
          payload: audioTrack
        };
      }

  static REMOVE_AUDIOTRACK = '[PlayList] remove AudioTrack to playlist';
      removeAudioTrack(audioTrack: AudioTrack): Action {
        return {
          type: PlayListActions.REMOVE_AUDIOTRACK,
          payload: audioTrack
        };
      }
      
}
