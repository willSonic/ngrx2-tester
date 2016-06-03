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
     
     static LOAD_PLAYER_COMPLETE = '[AudioPlayer] Load Player Complete';
      loadPlayer(audioItem: AudioItem): Action {
         return {
              type:AudioPlayerActions.LOAD_PLAYER_COMPLETE,
              payload:audioItem
         };
     }

     static PLAYER_START = '[AudioPlayer] Player Start';
     playerStart(audioItem: AudioItem): Action {
         return {
              type:AudioPlayerActions.PLAYER_START,
              payload:audioItem
         };
     }

     static PLAYER_STOP = '[AudioPlayer] Player stop';
     playerStop(audioItem: AudioItem): Action {
         return {
              type:AudioPlayerActions.PLAYER_STOP,
              payload:audioItem
         };
     }

     static UPDATE_TIME = '[AudioPlayer] Update Time';
     updateTime(audioItem: AudioItem): Action {
         return {
              type:AudioPlayerActions.UPDATE_TIME,
              payload:audioItem
         };
     }

     static UPDATE_VOLUME = '[AudioPlayer] Update Volume';
     updateValue(audioItem: AudioItem): Action {
         return {
              type:AudioPlayerActions.UPDATE_VOLUME,
              payload:audioItem
         };
     }
}