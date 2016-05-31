import { Injectable } from '@angular/core';
import { Action } from "@ngrx/store";
import { AudioItem } from '../models';


@Injectable()
export class AudioPlayerActions {

     static LOAD_PLAYER = '[AudioPlayer] Load Player';
      loadPlayer(audioItem: AudioItem): Action {
         return {
              type:AudioPlayerActions.LOAD_PLAYER,
              payload:audioItem
         };
     }

     static PLAYER_START = '[AudioPlayer] Player Start';
     playerStart(): Action {
         return {
              type:AudioPlayerActions.PLAYER_START,
         };
     }

     static PLAYER_STOP = '[AudioPlayer] Player stop';
     playerStop(): Action {
         return {
              type:AudioPlayerActions.PLAYER_STOP,
         };
     }

     static UPDATE_TIME = '[AudioPlayer] Update Time';
     updateTime(): Action {
         return {
              type:AudioPlayerActions.UPDATE_TIME
         };
     }

     static UPDATE_VOLUME = '[AudioPlayer] Update Volume';
     requestArtist(gainVal: number): Action {
         return {
              type:AudioPlayerActions.UPDATE_VOLUME,
              payload:gainVal
         };
     }
}