import { Injectable } from '@angular/core';
import { Action } from "@ngrx/store";
import { Artist } from '../models';
import { AudioItem } from '../models';

@Injectable()
export class PlayListActions {

     static ADD_ARTIST_TO_PLAYLIST = '[PlayList] add artist';
      loadPlayer(artist: Artist): Action {
         return {
              type:PlayListActions.ADD_ARTIST_TO_PLAYLIST,
              payload:artist
         };
     }

     static UPDATE_AUDIOITEM_PLAYSTATE_IN_PLAYLIST = '[PlayList] update playlist item state of play ';
     updateAudioItemPlaystate(isPlaying:boolean): Action {
         return {
              type:PlayListActions.UPDATE_AUDIOITEM_PLAYSTATE_IN_PLAYLIST,
              payload:isPlaying
         };
     }


}
