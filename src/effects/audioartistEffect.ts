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
import { Store } from '@ngrx/store';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Database } from '@ngrx/db';

import { AppState, getAudioTracks } from '../reducers';
import { SpotifyService } from '../services/SpotifyService';
import { AudioArtistActions } from '../actions/audioArtistsAction';
import { AudioArtist, Album } from '../models';
import { AlbumActions } from "../actions/albumsAction";
import { AudioTrackActions } from "../actions/audioTrackAction";
import { PlayListActions } from "../actions/playListAction";


@Injectable()
export class AudioArtistEffects {
  constructor(
    private _store:Store<AppState>,
    private updates$: StateUpdates<AppState>,
    private spotifyArtists: SpotifyService,
    private db: Database,
    private albumActions: AlbumActions,
    private audioArtistActions: AudioArtistActions,
    private audioTrackActions:AudioTrackActions,
    private playListActions:PlayListActions
  ) { }


  /*getLoadAudioTracks(){
     return this._store.let(getAudioTracks())
      .filter(audioTracks => audioTracks)
      .take(1);
  //  .map(audioTracks => this.audioTrackActions.audioTrackCreatonSuccess(audioTracks)));

  }*/
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
  @Effect() openDB$ = this.db.open('albums_app').filter(() => false);


  @Effect() loadCollectionOnInit$ = Observable.of(this.albumActions.loadCollection());


  @Effect() loadCollection$ = this.updates$
    .whenAction(AlbumActions.LOAD_COLLECTION)
    .switchMapTo(this.db.query('albums').toArray())
    .map((albums: Album[]) => this.albumActions.loadCollectionSuccess(albums));


  @Effect() search$ = this.updates$
    .whenAction(AlbumActions.SEARCH_ALBUM)
    .map<string>(toPayload)
    .filter(query => query !== '')
    .switchMap(query => this.spotifyArtists.searchAudioArtist(query)
      .map(audioArtists => this.albumActions.searchAlbumComplete(audioArtists))
      .catch(() => Observable.of(this.albumActions.searchAlbumComplete([]) ))
      );

  @Effect() clearSearch$ = this.updates$
    .whenAction(AlbumActions.SEARCH_ALBUM)
    .map<string>(toPayload)
    .filter(query => query === '')
    .mapTo(this.albumActions.searchAlbumComplete([]));
  

  @Effect() addAlbumsFromAudioArtistSearh$ = this.updates$
      .whenAction(AudioArtistActions.SEARCH_COMPLETE)
      .map<AudioArtist[]>(toPayload)
      .map((audioArtists:AudioArtist[]) =>  this.albumActions.loadAlbumsFromAudioArtist(audioArtists))
      .catch(() => Observable.of(this.albumActions.searchAlbumComplete([])));


  @Effect() clearAlbumsFromAudioArtistSearh$ = this.updates$
      .whenAction(AudioArtistActions.SEARCH)
      .map<string>(toPayload)
      .filter(query => query !== '')
      .mapTo(this.albumActions.searchAlbumComplete([]));


  @Effect() audioArtistSearch$ = this.updates$
    .whenAction(AudioArtistActions.SEARCH)
    .map<string>(toPayload)
    .filter(query => query !== '')
    .switchMap(query => this.spotifyArtists.searchAudioArtist(query)
      .map(audioArtists => this.audioArtistActions.searchComplete(audioArtists))
      .catch(() => Observable.of(this.audioArtistActions.searchComplete([]) ))
    );

    @Effect() clearAudioArtistSearch$ = this.updates$
    .whenAction(AudioArtistActions.SEARCH)
    .map<string>(toPayload)
    .filter(query => query === '')
    .mapTo(this.audioArtistActions.searchComplete([]));


  @Effect() addAlbumToCollection$ = this.updates$
    .whenAction(AlbumActions.ADD_TO_COLLECTION)
    .map<Album>(toPayload)
    .mergeMap(album => this.db.insert('albums', [ album ])
      .mapTo(this.albumActions.addToCollectionSuccess(album))
      .catch(() => Observable.of(
        this.albumActions.addToCollectionFail(album)
      ))
    );
    
  @Effect() createAudioTrack = this.updates$
    .whenAction(AlbumActions.LOAD_COLLECTION_SUCCESS)
    .map<Album[]>(toPayload)
    .map((albums:Album[]) =>  this.audioTrackActions.createAudioTracksFromAlbumList(albums)).mapTo(getAudioTracks())
      .map(entities => entities)
    .do(v => console.log("---------v =", v));
    //.mapTo(this.audioTrackActions.buildComplete());
    //.mapTo(getAudioTracks())
    //.switchMap(entities => this.audioTrackActions.audioTrackCreatonSuccess(entities) );

      //.do(getAudioTracks());

  //  .switchMap((audioTracks = this.getLoadAudioTracks()) => this.audioTrackActions.audioTrackCreatonSuccess(audioTracks));

/*
  @Effect() addAudioTracksToPlayList = this.updates$
      .whenAction(AudioTrackActions.AUDIOTRACK_FROM_COLLECTION_SUCCESS)
      .map<AudioTrack[]>(toPayload)
      .map((audioTracks:AudioTrack[]) => {
        return this.playListActions.addAudioTrackList(audioTracks)
      });
*/

  @Effect() removeAlbumFromCollection$ = this.updates$
    .whenAction(AlbumActions.REMOVE_FROM_COLLECTION)
    .map<Album>(toPayload)
    .mergeMap(album => this.db.executeWrite('albums', 'delete', [ album.trackId ])
      .mapTo(this.albumActions.removeFromCollectionSuccess(album))
      .catch(() => Observable.of(
        this.albumActions.removeFromCollectionFail(album)
      ))
    );
}
