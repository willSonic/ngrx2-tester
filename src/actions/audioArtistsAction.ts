import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { AudioArtist } from '../models';


@Injectable()
export class AudioArtistActions {

     static REQUEST_ARTISTS = '[Artist] Request Artist';
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
      addToCollection(book: AudioArtist): Action {
        return {
          type: AudioArtistActions.ADD_TO_COLLECTION,
          payload: book
        };
      }
    
      static ADD_TO_COLLECTION_SUCCESS = '[AudioArtist] Add to Collection Success';
      addToCollectionSuccess(book: AudioArtist): Action {
        return {
          type: AudioArtistActions.ADD_TO_COLLECTION_SUCCESS,
          payload: book
        };
      }
    
      static ADD_TO_COLLECTION_FAIL = '[AudioArtist] Add to Collection Fail';
      addToCollectionFail(book: AudioArtist): Action {
        return {
          type: AudioArtistActions.ADD_TO_COLLECTION_FAIL,
          payload: book
        };
      }
    
      static REMOVE_FROM_COLLECTION = '[AudioArtist] Remove from Collection';
      removeFromCollection(book: AudioArtist): Action {
        return {
          type: AudioArtistActions.REMOVE_FROM_COLLECTION,
          payload: book
        };
      }
    
      static REMOVE_FROM_COLLECTION_SUCCESS = '[AudioArtist] Remove From Collection Success';
      removeFromCollectionSuccess(book: AudioArtist): Action {
        return {
          type: AudioArtistActions.REMOVE_FROM_COLLECTION_SUCCESS,
          payload: book
        };
      }
    
      static REMOVE_FROM_COLLECTION_FAIL = '[AudioArtist] Remove From Collection Fail';
      removeFromCollectionFail(book: AudioArtist): Action {
        return {
          type: AudioArtistActions.REMOVE_FROM_COLLECTION_FAIL,
          payload: book
        };
      }
    
      static LOAD_COLLECTION = '[AudioArtist] Load Collection';
      loadCollection(): Action {
        return {
          type: AudioArtistActions.LOAD_COLLECTION
        };
      }
    
      static LOAD_COLLECTION_SUCCESS = '[AudioArtist] Load Collection Success';
      loadCollectionSuccess(books: AudioArtist[]): Action {
        return {
          type: AudioArtistActions.LOAD_COLLECTION_SUCCESS,
          payload: books
        };
      }
    
      static LOAD_BOOK = '[AudioArtist] Load AudioArtist';
      loadAudioArtist(book: AudioArtist): Action {
        return {
          type: AudioArtistActions.LOAD_BOOK,
          payload: book
        };
      }
}
