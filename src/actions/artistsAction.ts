import { Injectable } from '@angular/core';
import {Action} from "@ngrx/store";
import { Artist } from '../models';


@Injectable()
export class ArtistActions {

     static REQUEST_ARTISTS = '[Artist] Request Artist';
     requestArtist(query: string): Action {
         return {
              type:ArtistActions.REQUEST_ARTISTS,
              payload:query
         };
     }
      static ARTIST_REQUEST_COMPLETE = '[Artist] Artist Request Complete';
      artistRequestComplete(results: Artist[]): Action {
        return {
          type: ArtistActions.ARTIST_REQUEST_COMPLETE,
          payload: results
        };
      }
}
