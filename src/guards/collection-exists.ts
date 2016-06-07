import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guard, TraversalCandidate, Router } from '@ngrx/router';
import { Observable } from 'rxjs/Observable';

import { AppState, getAudioArtistCollection, getCollectionLoaded } from '../reducers';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's traversal process whether the route should continue
 * to be considered a candidate route. Guards must return an observable of
 * true or false.
 *
 * More on guards: https://github.com/ngrx/router/blob/master/docs/overview/guards.md
 */
@Injectable()
export class CollectionExistGuard implements Guard {
  constructor(
    private store: Store<AppState>,
    private _router: Router
  ) { }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad() {
    return this.store.let(getCollectionLoaded())
      .filter(loaded => loaded)
      .take(1);
  }


   checkForAudioArtistCollection(){
    return this.store.let(getAudioArtistCollection())
      .switchMap(inStore => {
              // console.log('[CollectionExistGuard] -checkForAudioArtistCollection= inStore',inStore.length);
              return (inStore && inStore.length>0)? Observable.of(true): Observable.of(false)
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
    return this.waitForCollectionToLoad()
      .switchMapTo(this.checkForAudioArtistCollection())
          .map((audioArtistPresent) => {
               if(!audioArtistPresent){
                  this._router.go('/audioArtist/find')
               }
               return audioArtistPresent;
          });
  }
}
