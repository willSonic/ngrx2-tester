import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getSearchResults, getSearchQuery } from '../reducers';
import { AudioArtistActions } from '../actions';
import { ArtistSearch, QueryInput, SearchOutput } from '../components/search/artist-search';
//import { BookPreviewListComponent, BooksInput } from '../components/book-preview-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';


@Component({
  selector: 'audioArtist-find-page',
  directives: [
    ArtistSearch
  ],
  template: `
      <artist-search [query]="searchQuery$ | async" (search)="search($event)"></artist-search>
  `,
})
export class AudioArtistFindPage {
  searchQuery$: Observable<QueryInput>;
  //audioArtists$: Observable<AudioArtistsInput>;

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
    //this.audioArtists$ = store.let(getSearchResults());
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
