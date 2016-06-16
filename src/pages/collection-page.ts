import 'rxjs/add/operator/let';
import { Component } from '@angular/core';
import { RouteParams } from '@ngrx/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AlbumActions } from '../actions';
import {  Album } from '../models';
import { AppState, getAlbumCollection, isAlbumInCollection} from '../reducers';
import { RemoveOutput} from '../components/artistdisplay/album-detail';
import { AlbumCollectionListComponent,
         AlbumsInput } from '../components/artistdisplay/album-collection-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';


@Component({
  selector: 'collection-page',
  directives: [ AlbumCollectionListComponent, MD_CARD_DIRECTIVES ],
  template: `
    <md-card>
      <md-card-title>Collection of Albums</md-card-title>
    </md-card>
    <album-collection-list 
      (removeFromCollection)="removeFromCollection($event)"
      [albums]="albums$ | async" ></album-collection-list>
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

  constructor(private store: Store<AppState>,private albumActions:AlbumActions) {
    this.albums$ = store.let(getAlbumCollection());
  }

  removeFromCollection(album: Album) {
    this.store.dispatch(this.albumActions.removeFromCollection(album));
  }
}
