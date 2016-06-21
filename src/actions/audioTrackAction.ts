import { Injectable } from '@angular/core';
import { Action, Store} from "@ngrx/store";
import { Album, AudioTrack } from '../models';
import { getAudioTracks } from '../reducers';


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
      static AUDIOTRACK_FROM_COLLECTION_SUCCESS = '[AudioTrack] Load Collection';
      audioTrackCreatonSuccess(audoTracks:AudioTrack[]): Action {
        return {
          type: AudioTrackActions.AUDIOTRACK_FROM_COLLECTION_SUCCESS,
          payload: audoTracks
        };
      }

/*
      static AUDIOTRACK_COLLECTION_SUCCESS = '[AudioTrack] create AudioTracks Success';
      buildCompleteFromCollection(audioTracks:AudioTrack[]): Action{
        return {
          type: AudioTrackActions.AUDIOTRACK_COLLECTION_SUCCESS,
          action:audioTracks
        };
      }

     static AUDIOTRACK_COLLECTION_FAIL = '[AudioTrack] create AudioTracks Success';
      buildCompleteFromCollectionFail(audioTracks: AudioTrack[]): Action{
        return {
          type: AudioTrackActions.AUDIOTRACK_COLLECTION_FAIL,
          action:audioTracks
        };
      }
*/
}
