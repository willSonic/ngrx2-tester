import { Injectable } from '@angular/core';
import { Action} from "@ngrx/store";
import { Album, AudioArtist } from '../models';


@Injectable()
export class AlbumActions {
     static SEARCH_ALBUM = '[Album] SEARCH_ALBUM';
      searchAlbum(query: string): Action {
        return {
          type: AlbumActions.SEARCH_ALBUM,
          payload: query
        };
      }

      static SEARCH_COMPLETE_ALBUM = '[Album] Search Complete';
      searchAlbumComplete(results: Album[]): Action {

         console.log("/n [AlbumActions]=--SEARCH_COMPLETE_ALBUM --results",results);
        return {
          type: AlbumActions.SEARCH_COMPLETE_ALBUM,
          payload: results
        };
      }

     static SEARCH_COMPLETE_FROM_AUDIOARTIST = '[Album] Search Complete for Audio Artist';
      loadAlbumsFromAudioArtist(results: AudioArtist[]): Action {
         console.log("[AlbumActions]=---- SEARCH_COMPLETE_FROM_AUDIOARTIST --results",results);
        return {
          type: AlbumActions.SEARCH_COMPLETE_FROM_AUDIOARTIST,
          payload: results
        };
      }

      static ADD_TO_COLLECTION = '[Album] Add to Collection';
      addToCollection(album: Album): Action {
        return {
          type: AlbumActions.ADD_TO_COLLECTION,
          payload: album
        };
      }

      static ADD_TO_COLLECTION_SUCCESS = '[Album] Add to Collection Success';
      addToCollectionSuccess(album: Album): Action {
        return {
          type: AlbumActions.ADD_TO_COLLECTION_SUCCESS,
          payload: album
        };
      }

      static ADD_TO_COLLECTION_FAIL = '[Album] Add to Collection Fail';
      addToCollectionFail(album: Album): Action {
        return {
          type: AlbumActions.ADD_TO_COLLECTION_FAIL,
          payload: album
        };
      }

      static REMOVE_FROM_COLLECTION = '[Album] Remove from Collection';
      removeFromCollection(album: Album): Action {
        console.log('[albumAction.ts] --- REMOVE_FROM_COLLECTION---');
        return {
          type: AlbumActions.REMOVE_FROM_COLLECTION,
          payload: album
        };
      }

      static REMOVE_FROM_COLLECTION_SUCCESS = '[Album] Remove From Collection Success';
      removeFromCollectionSuccess(album: Album): Action {
        console.log('[albumAction.ts] --- REMOVE_FROM_COLLECTION_SUCCESS---');
        return {
          type: AlbumActions.REMOVE_FROM_COLLECTION_SUCCESS,
          payload: album
        };
      }

      static REMOVE_FROM_COLLECTION_FAIL = '[Album] Remove From Collection Fail';
      removeFromCollectionFail(album: Album): Action {
        console.log('[albumAction.ts] --- REMOVE_FROM_COLLECTION_FAIL---');
        return {
          type: AlbumActions.REMOVE_FROM_COLLECTION_FAIL,
          payload: album
        };
      }

      static LOAD_COLLECTION = '[Album] Load Collection';
      loadCollection(): Action {
        return {
          type: AlbumActions.LOAD_COLLECTION
        };
      }

      static LOAD_COLLECTION_SUCCESS = '[Album] Load Collection Success';
      loadCollectionSuccess(albums: Album[]): Action {
        return {
          type: AlbumActions.LOAD_COLLECTION_SUCCESS,
          payload: albums
        };
      }

      static LOAD_ALBUM = '[Album] Load Album';
      loadAlbum(album: Album): Action {
        console.log('[albumAction.ts] --- LOAD_ALBUM---')
        return {
          type: AlbumActions.LOAD_ALBUM,
          payload: album
        };
      }
}
