import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getSearchResults, getSearchQuery } from '../reducers';
import { AudioArtistActions } from '../actions';
import { ArtistSearch, QueryInput, SearchOutput } from '../components/search/artist-search';
import { AudioArtistPreviewListComponent, AudioArtistsInput } from '../components/artistdisplay/audioArtist-preview-list';
//import { BookPreviewListComponent, BooksInput } from '../components/book-preview-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';


@Component({
  selector: 'audioArtist-find-page',
  directives: [
    ArtistSearch,
    AudioArtistPreviewListComponent
  ],
  styles: [`
    md-card.search-card{
      background-color:#5f84a5;
    }
    md-card.search-card md-card-content {
      display: flex;
      justify-content: center;
    }
  `],
  template: `  
      <h2 class="search-title"> Spotify Artist Search</h2>
      <div class="search-box" layout="row" layout-align="center center" flex="100">
        <artist-search layout-fill [query]="searchQuery$ | async" (search)="search($event)"></artist-search>
      </div>
      <div layout="row"  flex="100">
         <audioartist-preview-list [audioArtists]="audioArtists$ | async"></audioartist-preview-list>
      </div>
  `,
})
export class AudioArtistFindPage {
  searchQuery$: Observable<QueryInput>;
  audioArtists$: Observable<AudioArtistsInput>;

  constructor(private store: Store<AppState>, private audioArtistActions: AudioArtistActions) {
    /**
     * Selectors can be applied with the `let` operator, which passes the source
     * observable to the provided function. This allows us an expressive,
     * composable technique for creating view projections.
     *
     * More on `let`: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35#let
     * More on selectors: https://gist.github.com/btroncone/a6e4347326749f938510#extracting-selectors-for-reuse
     */
    this.searchQuery$ = store.let(getSearchQuery()).take(1);
    this.audioArtists$ = store.let(getSearchResults());
  }

  search(query: SearchOutput) {
    /**
     * All state updates are handled through dispatched actions in 'smart'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our application.
     */
    this.store.dispatch(this.audioArtistActions.search(query));
  }
}
