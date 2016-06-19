import 'rxjs/add/operator/let';
import { Component } from '@angular/core';
import { RouteParams } from '@ngrx/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PlayListActions } from '../actions';
import {  Album } from '../models';
import { AppState, getPlayList, getCollectionAlbumTrackIds} from '../reducers';
import { RemoveOutput} from '../components/artistdisplay/album-detail';
import { AudioTrackListComponent,AudioTracksInput } from '../components/playlist-display/audiotrack-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';


@Component({
  selector: 'playlist-page',
  directives: [ AudioTrackListComponent, MD_CARD_DIRECTIVES ],
  template: `
    <md-card>
      <md-card-title>PlayList</md-card-title>
    </md-card>
    <audiotrack-list
      [playList]="playList$ | async" ></audiotrack-list>
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
export class PlayListPage {
  playList$: Observable<AudioTracksInput>;
  constructor(private store: Store<AppState>, private playListActions:PlayListActions) {
    this.playList$ = store.let(getPlayList());
  }

}
