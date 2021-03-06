import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 * 
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeLogger is a powerful metareducer that logs out each time we dispatch
 * an action.
 *
 * A metareducer wraps a reducer function and returns a new reducer function
 * with superpowers. They are handy for all sorts of tasks, including
 * logging, undo/redo, and more.
 */
import { storeLogger } from 'ngrx-store-logger';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 * 
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * @ngrx/router-store keeps the router in sync with @ngrx/store. To connect the
 * two, we need to use the routerReducer.
 */
import { routerReducer, RouterState } from '@ngrx/router-store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import searchReducer, * as fromSearch from './searchReducer';
import albumsReducer, * as fromAlbums from './albumReducer';
import audioArtistsReducer, * as fromAudioArtists from './audioArtistsReducer';
import collectionReducer, * as fromCollection from './collectionReducer';
import playListReducer, * as fromPlayList from './playListReducer';
import audioTrackReducer, * as fromAudioTracks from './audioTrackReducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
  router: RouterState;
  search: fromSearch.SearchState;
  albums: fromAlbums.AlbumState;
  audioArtists: fromAudioArtists.AudioArtistState;
  collection: fromCollection.CollectionState;
  playList: fromPlayList.PlayListState;
  audioTracks: fromAudioTracks.AudioTrackState;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export default compose(storeLogger(), combineReducers)({
    router: routerReducer,
    search: searchReducer,
    albums:albumsReducer,
    audioArtists: audioArtistsReducer,
    collection: collectionReducer,
    playList:playListReducer,
    audioTracks:audioTrackReducer
});


/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `let` operator. They take an input observable
 * and return a new observable. Here's how you would use this selector:
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<AppState>) {
 * 	  this.booksState$ = state$.let(getBooksState());
 * 	}
 * }
 * ```
 */
 export function getAudioArtistsState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.audioArtists);
}

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * Once again our compose function comes in handy. From right to left, we
 * first select the books state then we pass the state to the book
 * reducer's getBooks selector, finally returning an observable
 * of search results.
 */
 export function getAudioArtistEntities() {
   return compose(fromAudioArtists.getAudioArtistEntities(), getAudioArtistsState());
 }

 export function getAudioArtist(id: string) {
   return compose(fromAudioArtists.getAudioArtist(id), getAudioArtistsState());
 }

 export function hasAudioArtist(id: string) {
   return compose(fromAudioArtists.hasAudioArtist(id), getAudioArtistsState());
 }

 export function getAudioArtists(audioArtistIds: string[]) {
   return compose(fromAudioArtists.getAudioArtists(audioArtistIds), getAudioArtistsState());
 }





/**
 * Just like with the a;bi, selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
 export function geAlbumsState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.albums);
}

/**
 */
 export function getAlbumEntities() {
   return compose(fromAlbums.getAlbumEntities(), geAlbumsState());
 }

 export function getAlbum(trackId: string) {
    console.log('[index.ts reducers] --getAlbum trackId'+trackId);
   return compose(fromAlbums.getAlbum(trackId), geAlbumsState());
 }

 export function hasAlbum(trackId: string) {
   return compose(fromAlbums.hasAlbum(trackId), geAlbumsState());
 }

 export function getAlbums(albumIds: string[]) {
   return compose(fromAlbums.getAlbums(albumIds), geAlbumsState());
 }


/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export function getSearchState() {
 return (state$: Observable<AppState>) => state$
   .select(s => s.search);
}

export function getSearchAudioArtistIds() {
  return compose(fromSearch.getAudioArtistIds(), getSearchState());
}

export function getSearchStatus() {
  return compose(fromSearch.getStatus(), getSearchState());
}

export function getSearchQuery() {
  console.log('Do getSearchQuery Querry for Arist')
  return compose(fromSearch.getQuery(), getSearchState());
}

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
export function getSearchResults() {
  return (state$: Observable<AppState>) => state$
    .let(getSearchAudioArtistIds())
    .switchMap(audioArtistIds => state$.let(getAudioArtists(audioArtistIds)));
}



export function getCollectionState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.collection);
}

export function getCollectionLoaded() {
  return compose(fromCollection.getLoaded(), getCollectionState());
}

export function getCollectionLoading() {
  return compose(fromCollection.getLoading(), getCollectionState());
}

export function getCollectionAlbumTrackIds() {
  return compose(fromCollection.getAlbumsTrackIds(), getCollectionState());
}

export function isAlbumInCollection(trackId: string) {
  return compose(fromCollection.isAlbumInCollection(trackId), getCollectionState());
}


export function getAlbumCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getCollectionAlbumTrackIds())
    .switchMap(albumIds => {
         return state$.let(getAlbums(albumIds))
    } );
}



export function getPlayListState(){
  return (state$: Observable<AppState>) => state$
    .select(s => s.playList);
}

export function getPlayList(){
  return compose(fromPlayList.getPlayList(), getPlayListState());
}





export function getAudioTrackState(){
    return (state$: Observable<AppState>) => state$
        .select(s => s.audioTracks);
}

export function getAudioTracks(){
    return compose(fromAudioTracks.getAudioTracksEntities(), getAudioTrackState());
}