import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Database } from '@ngrx/db';

import { AppState } from '../reducers';
import { SpotifyService } from '../services/SpotifyService';
import { AudioArtistActions } from '../actions/audioArtistsAction';
import { AudioArtist } from '../models';


@Injectable()
export class AudioArtistEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private spotifyArists: SpotifyService,
    private db: Database,
    private audioArtistActions: AudioArtistActions
  ) { }

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */
  @Effect() openDB$ = this.db.open('audioartists_app').filter(() => false);


  @Effect() loadCollectionOnInit$ = Observable.of(this.audioArtistActions.loadCollection());


  @Effect() loadCollection$ = this.updates$
    .whenAction(AudioArtistActions.LOAD_COLLECTION)
    .switchMapTo(this.db.query('audioartists').toArray())
    .map((audioArtists: AudioArtist[]) => this.audioArtistActions.loadCollectionSuccess(audioArtists));


  @Effect() search$ = this.updates$
    .whenAction(AudioArtistActions.SEARCH)
    .map<string>(toPayload)
    .filter(query => query !== '')
    .switchMap(query => this.spotifyArists.searchAudioArtist(query)
      .map(audioArtists => this.audioArtistActions.searchComplete(audioArtists))
      .catch(() => Observable.of(this.audioArtistActions.searchComplete([])))
    );


  @Effect() clearSearch$ = this.updates$
    .whenAction(AudioArtistActions.SEARCH)
    .map<string>(toPayload)
    .filter(query => query === '')
    .mapTo(this.audioArtistActions.searchComplete([]));


  @Effect() addAudioArtistToCollection$ = this.updates$
    .whenAction(AudioArtistActions.ADD_TO_COLLECTION)
    .map<AudioArtist>(toPayload)
    .mergeMap(audioArtist => this.db.insert('audioartists', [ audioArtist ])
      .mapTo(this.audioArtistActions.addToCollectionSuccess(audioArtist))
      .catch(() => Observable.of(
        this.audioArtistActions.removeFromCollectionFail(audioArtist)
      ))
    );


  @Effect() removeAudioArtistFromCollection$ = this.updates$
    .whenAction(AudioArtistActions.REMOVE_FROM_COLLECTION)
    .map<AudioArtist>(toPayload)
    .mergeMap(audioArtist => this.db.executeWrite('audioartists', 'delete', [ audioArtist.id ])
      .mapTo(this.audioArtistActions.removeFromCollectionSuccess(audioArtist))
      .catch(() => Observable.of(
        this.audioArtistActions.removeFromCollectionFail(audioArtist)
      ))
    );
}
