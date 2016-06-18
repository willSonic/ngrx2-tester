import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { RouteParams } from '@ngrx/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AppState, getAlbum, isAlbumInCollection, getCollectionState} from '../reducers';
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
      (add)="addToCollection($event)">
    </audioartist-detail>
  `
})
export class AudioArtistViewPage {
  album$: Observable<AlbumInput>;
  isAlbumInCollection$: Observable<InCollectionInput>;
  
  collectionChange:any;

  subject:any;

  constructor(
    private store: Store<AppState>,
    private albumActions: AlbumActions,
    private routeParams$: RouteParams
  ) {

     routeParams$.select<string>('trackId').subscribe(value =>
             console.log("[audioartist-viewpage.t audioBuffer routeParams$ =", value))

    this.album$ = routeParams$
      .select<string>('trackId')
      .switchMap(trackId => store.let(getAlbum(trackId)));

    this.isAlbumInCollection$ = routeParams$
      .select<string>('trackId')
      .switchMap(trackId => store.let(isAlbumInCollection(trackId)));

    this.collectionChange = store.let( getCollectionState());


    this.collectionChange.subscribe(state =>
             console.log("[audioartist-viewpage.t audioBuffer audioItemState =", state.trackIds)
    );
  }

  addToCollection(album: AddOutput) {
    console.log('audioartist-viewpage.ts ====  ADDIND ALBUM');
    this.store.dispatch(this.albumActions.addToCollection(album));
  }
}
