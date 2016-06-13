import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guard, TraversalCandidate, Router } from '@ngrx/router';
import { Observable } from 'rxjs/Observable';

import { SpotifyService } from '../services/SpotifyService';
import { AppState, hasAudioArtist, getCollectionLoaded } from '../reducers';
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
  hasAudioArtistInStore(id: string) {
    console.log('[AudioArtistExistsGuard] ----  hasAudioArtistInStore === id '+id);
    return this.store.let(hasAudioArtist(id)).take(1);
  }

  /**
   * This method loads a book with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasAudioArtistInApi(id: string) {
    console.log('[AudioArtistExistsGuard] ----  hasAudioArtistInApi === id '+id);
    return this.spotifyArtists.retrieveAudioArtist(id)
      .map(audioArtist => this.audioArtistActions.loadAudioArtist(audioArtist))
      .do(action => this.store.dispatch(action))
      .map(audioArtist => !!audioArtist)
      .catch(() => Observable.of(false));
  }

  /**
   * `hasBook` composes `hasBookInStore` and `hasBookInApi`. It first checks
   * if the book is in store, and if not it then checks if it is in the
   * API.
   */
  hasAudioArtist(id: string) {
  console.log('[AudioArtistExistsGuard] ----  hasAudioArtist === id ='+ id);
    return this.hasAudioArtistInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return Observable.of(inStore);
        }
        return this.hasAudioArtistInApi(id);
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
  protectRoute({ routeParams: { id } }: TraversalCandidate) {
     console.log('[AudioArtistExistsGuard] ----  protectRoute === routeParams ='+ id);
    return this.waitForCollectionToLoad()
      .switchMapTo(this.hasAudioArtist(id));
  }
}
