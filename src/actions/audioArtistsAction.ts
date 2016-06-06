import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { AudioArtist } from '../models';


@Injectable()
export class AudioArtistActions {

     static REQUEST_ARTISTS = '[audioArtist] Request Artist';
     requestArtist(query: string): Action {
         return {
              type:AudioArtistActions.REQUEST_ARTISTS,
              payload:query
         };
     }
      static ARTIST_REQUEST_COMPLETE = '[Artist] Artist Request Complete';
      artistRequestComplete(results: AudioArtist[]): Action {
        return {
          type: AudioArtistActions.ARTIST_REQUEST_COMPLETE,
          payload: results
        };
      }
      
      
     static SEARCH = '[AudioArtist] Search';
      search(query: string): Action {
        return {
          type: AudioArtistActions.SEARCH,
          payload: query
        };
      }
    
      static SEARCH_COMPLETE = '[AudioArtist] Search Complete';
      searchComplete(results: AudioArtist[]): Action {
        return {
          type: AudioArtistActions.SEARCH_COMPLETE,
          payload: results
        };
      }
    
      static ADD_TO_COLLECTION = '[AudioArtist] Add to Collection';
      addToCollection(audioArtist: AudioArtist): Action {
        return {
          type: AudioArtistActions.ADD_TO_COLLECTION,
          payload: audioArtist
        };
      }
    
      static ADD_TO_COLLECTION_SUCCESS = '[AudioArtist] Add to Collection Success';
      addToCollectionSuccess(audioArtist: AudioArtist): Action {
        return {
          type: AudioArtistActions.ADD_TO_COLLECTION_SUCCESS,
          payload: audioArtist
        };
      }
    
      static ADD_TO_COLLECTION_FAIL = '[AudioArtist] Add to Collection Fail';
      addToCollectionFail(audioArtist: AudioArtist): Action {
        return {
          type: AudioArtistActions.ADD_TO_COLLECTION_FAIL,
          payload: audioArtist
        };
      }
    
      static REMOVE_FROM_COLLECTION = '[AudioArtist] Remove from Collection';
      removeFromCollection(audioArtist: AudioArtist): Action {
        return {
          type: AudioArtistActions.REMOVE_FROM_COLLECTION,
          payload: audioArtist
        };
      }
    
      static REMOVE_FROM_COLLECTION_SUCCESS = '[AudioArtist] Remove From Collection Success';
      removeFromCollectionSuccess(audioArtist: AudioArtist): Action {
        return {
          type: AudioArtistActions.REMOVE_FROM_COLLECTION_SUCCESS,
          payload: audioArtist
        };
      }
    
      static REMOVE_FROM_COLLECTION_FAIL = '[AudioArtist] Remove From Collection Fail';
      removeFromCollectionFail(audioArtist: AudioArtist): Action {
        return {
          type: AudioArtistActions.REMOVE_FROM_COLLECTION_FAIL,
          payload: audioArtist
        };
      }
    
      static LOAD_COLLECTION = '[AudioArtist] Load Collection';
      loadCollection(): Action {
console.log("[AudioArtist] Load Collection")
        return {
          type: AudioArtistActions.LOAD_COLLECTION
        };
      }
    
      static LOAD_COLLECTION_SUCCESS = '[AudioArtist] Load Collection Success';
      loadCollectionSuccess(audioArtists: AudioArtist[]): Action {
        return {
          type: AudioArtistActions.LOAD_COLLECTION_SUCCESS,
          payload: audioArtists
        };
      }
    
      static LOAD_AUDIOARTIST = '[AudioArtist] Load AudioArtist';
      loadAudioArtist(audioArtist: AudioArtist): Action {
        return {
          type: AudioArtistActions.LOAD_AUDIOARTIST,
          payload: audioArtist
        };
      }
}
