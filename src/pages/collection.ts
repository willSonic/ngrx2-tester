import 'rxjs/add/operator/let';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getAudioArtistCollection } from '../reducers';
import { AudioArtistPreviewListComponent, AudioArtistInput } from '../components/artistdisplay/audioArtist-preview-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';


@Component({
  selector: 'collection-page',
  directives: [ AudioArtistPreviewListComponent, MD_CARD_DIRECTIVES ],
  template: `
    <md-card>
      <md-card-title>My Collection</md-card-title>
    </md-card>

    <audioartist-preview-list [audioArtists]="audioArtists$ | async"></audioartist-preview-list>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class CollectionPage {
  audioArtists$: Observable<AudioArtistInput>;

  constructor(store: Store<AppState>) {
    this.audioArtists$ = store.let(getAudioArtistCollection());
  }
}
