import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { RouteParams } from '@ngrx/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getAlbum, isAlbumInCollection } from '../reducers';
import { AlbumActions } from '../actions/albumsAction';
import {
  AlbumDetailComponent,
  AlbumInput,
  InCollectionInput,
  AddOutput,
  RemoveOutput
} from '../components/artistdisplay/album-detail';


@Component({
  selector: 'audioartist-view-page',
  directives: [ AlbumDetailComponent ],
  template: `
    <audioartist-detail
      [album]="album$ | async"
      [inCollection]="isAlbumInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </audioartist-detail>
  `
})
export class AudioArtistViewPage {
  album$: Observable<AlbumInput>;
  isAlbumInCollection$: Observable<InCollectionInput>;

  constructor(
    private store: Store<AppState>,
    private albumActions: AlbumActions,
    private routeParams$: RouteParams
  ) {
    this.album$ = routeParams$
      .select<string>('id')
      .switchMap(id => store.let(getAlbum(id)));

    this.isAlbumInCollection$ = routeParams$
      .select<string>('id')
      .switchMap(id => store.let(isAlbumInCollection(id)));

  }

  addToCollection(album: AddOutput) {
    this.store.dispatch(this.albumActions.addToCollection(album));
  }

  removeFromCollection(album: RemoveOutput) {
    this.store.dispatch(this.albumActions.removeFromCollection(album));
  }
}
