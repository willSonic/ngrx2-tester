import 'rxjs/add/operator/let';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getAlbumCollection } from '../reducers';
import { AlbumCollectionListComponent, AlbumInput } from '../components/artistdisplay/album-collection-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';


@Component({
  selector: 'collection-page',
  directives: [ AlbumCollectionListComponent, MD_CARD_DIRECTIVES ],
  template: `
    <md-card>
      <md-card-title>My Collection</md-card-title>
    </md-card>

    <album-collection-list [albums]="albums$ | async"></album-collection-list>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class CollectionPage {
  albums$: Observable<AlbumInput>;

  constructor(store: Store<AppState>) {
    this.albums$ = store.let(getAlbumCollection());
  }
}
