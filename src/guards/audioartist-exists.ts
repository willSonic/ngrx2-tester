import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guard, TraversalCandidate, Router } from '@ngrx/router';
import { Observable } from 'rxjs/Observable';

import { SpotifyService } from '../services/SpotifyService';
import { AppState, hasAlbum,  getCollectionLoaded } from '../reducers';
import { AlbumActions } from '../actions/albumsAction';
import { AudioArtistActions } from '../actions/audioArtistsAction';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's traversal process whether the route should continue
 * to be considered a candidate route. Guards must return an observable of
 * true or false.
 *
 * More on guards: https://github.com/ngrx/router/blob/master/docs/overview/guards.md
 */
@Injectable()
export class AudioArtistExistsGuard implements Guard {
  constructor(
    private store: Store<AppState>,
    private spotifyArtists: SpotifyService,
    private albumActions: AlbumActions,
    private audioArtistActions: AudioArtistActions,
    private _router: Router
  ) { }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad() {
    console.log('[AudioArtistExistsGuard] ----  waitForCollectionToLoad');
    return this.store.let(getCollectionLoaded())
      .filter(loaded => loaded)
      .take(1);
  }

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  hasAlbumInStore(trackId: string) {
    console.log('[AudioArtistExistsGuard] ----  hasAlbumInStore === id '+trackId);
    return this.store.let(hasAlbum(trackId)).take(1);
  }

  /**
   * This method loads a book with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasAlbumInApi(trackId: string) {
    console.log('[AudioArtistExistsGuard] ----  hasAlbumInApi === id '+trackId);
    return this.spotifyArtists.retrieveAlbum(trackId)
      .map(album => this.albumActions.loadAlbum(album))
      .do(action => this.store.dispatch(action))
      .map(album => !!album)
      .catch(() => Observable.of(false));
  }

  /**
   * `hasBook` composes `hasBookInStore` and `hasBookInApi`. It first checks
   * if the book is in store, and if not it then checks if it is in the
   * API.
   */
  hasAlbum(trackId: string) {
  console.log('[AudioArtistExistsGuard] ----  hasAlbum === id ='+ trackId);
    return this.hasAlbumInStore(trackId)
      .switchMap(inStore => {
        if (inStore) {
          return Observable.of(inStore);
        }
        return this.hasAlbumInApi(trackId);
      });
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  protectRoute({ routeParams: { trackId } }: TraversalCandidate) {
     console.log('[AudioArtistExistsGuard] ----  protectRoute === routeParams ='+ trackId);
    return this.waitForCollectionToLoad()
      .switchMapTo(this.hasAlbum(trackId));
  }
}
