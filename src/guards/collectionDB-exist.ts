import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Guard, Router, TraversalCandidate, LocationChange } from '@ngrx/router';
import { Observable } from 'rxjs/Observable';


import { getCollectionAudioArtistIds } from '../reducers';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's traversal process whether the route should continue
 * to be considered a candidate route. Guards must return an observable of
 * true or false.
 *
 * More on guards: https://github.com/ngrx/router/blob/master/docs/overview/guards.md
 */
@Injectable()
export class CollectionDBExistGuard implements Guard {
    constructor(private _http: Http, private _router: Router) { }

     /* This is the actual method the router will call when our guard is run.
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
    protectRoute(candidate:TraversalCandidate) {
        return getCollectionAudioArtistIds().map(()=> true)
            // If request fails, catch the error and redirect
            .catch(() => {
                this._router.go('/400');

                return Observable.of(false);
            });
    }
}
