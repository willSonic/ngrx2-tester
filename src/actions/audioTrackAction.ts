import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { Album, AudioTrack } from '../models';


@Injectable()
export class AudioTrackActions {
     static CREATE_AUDIOTRACK_FROM_COLLECTION = '[AudioTrack] create AudioTracks from Album List';
      createAudioTracksFromAlbumList(albums: Album[]): Action {
        return {
          type: AudioTrackActions.CREATE_AUDIOTRACK_FROM_COLLECTION,
          payload: albums
        };
      }

     static CREATE_AUDIOTRACK = '[AudioTrack] create a sinlge AudioTrack from Album';
      createAudioTracksFromAlbum(album: Album): Action {
        return {
          type: AudioTrackActions.CREATE_AUDIOTRACK,
          payload: album
        };
      }

}
