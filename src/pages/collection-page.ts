import 'rxjs/add/operator/let';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getAlbumCollection} from '../reducers';
import { AlbumCollectionListComponent, AlbumsInput } from '../components/artistdisplay/album-collection-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';


@Component({
  selector: 'collection-page',
  directives: [ AlbumCollectionListComponent, MD_CARD_DIRECTIVES ],
  template: `
    <md-card>
      <md-card-title>Collection of Albums</md-card-title>
    </md-card>

    <album-collection-list [albums]="albums$ | async" ></album-collection-list>
  `,
  styles: [`
     md-card{
          background: rgb(255, 255, 255) transparent;
          background: rgba(255, 255, 255, 0.04);
      }
   
    md-card-title {
      display: flex;
      justify-content: center;
      color:#2aa4c9;
      font-size:3em;
    }
  `]
})
export class CollectionPage {
  albums$: Observable<AlbumsInput>;

  constructor(store: Store<AppState>) {
    this.albums$ = store.let(getAlbumCollection());
  }
  
  addToCollection(book: AddOutput) {
    this.store.dispatch(this.bookActions.addToCollection(book));
  }

  removeFromCollection(book: RemoveOutput) {
    this.store.dispatch(this.bookActions.removeFromCollection(book));
  }
}
