import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { RouteParams } from '@ngrx/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getAudioArtist, isAlbumInCollection } from '../reducers';
import { AudioArtistActions } from '../actions/audioArtistsAction';
import {
  AudioArtistDetailComponent,
  AudioArtistInput,
  InCollectionInput,
  AddOutput,
  RemoveOutput
} from '../components/artistdisplay/audioArtist-detail';


@Component({
  selector: 'audioartist-view-page',
  directives: [ AudioArtistDetailComponent ],
  template: `
    <audioartist-detail
      [audioArtist]="audioArtist$ | async"
      [inCollection]="isAudioArtistInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </audioartist-detail>
  `
})
export class AudioArtistViewPage {
  audioArtist$: Observable<AudioArtistInput>;
  isAudioArtistInCollection$: Observable<InCollectionInput>;

  constructor(
    private store: Store<AppState>,
    private audioArtistActions: AudioArtistActions,
    private routeParams$: RouteParams
  ) {
    this.audioArtist$ = routeParams$
      .select<string>('id')
      .switchMap(id => store.let(getAudioArtist(id)));

    this.isAudioArtistInCollection$ = routeParams$
      .select<string>('id')
      .switchMap(id => store.let(isAlbumInCollection(id)));

  }

  addToCollection(audioArtist: AddOutput) {
    this.store.dispatch(this.audioArtistActions.addToCollection(audioArtist));
  }

  removeFromCollection(audioArtist: RemoveOutput) {
    this.store.dispatch(this.audioArtistActions.removeFromCollection(audioArtist));
  }
}
