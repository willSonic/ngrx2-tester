import { Component } from '@angular/core';


@Component({
  selector: 'app',
  template: `
    <navigator>
      <a linkTo="/">Collection</a>
      <a linkTo="/book/find">Find Book</a>
   </navigator>
   <!-- <route-view></route-view> -->
  `
})
export default class App { }


/*

import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ArtistList} from "./components/artist-list";
import { AudioList} from "./components/audio-list";
import { getArtists } from "./actions/artistsAction";
import { playAudioItem } from "./actions/audioplayerAction";
import { AudioServiceAction } from "./actions/audioServiceAction";
import { artistAsArraySelector } from "./selectors/artist.selector";
import { constructedPlaylistItem, playlistArraySelector } from "./selectors/playlist.selector";
import {AsyncPipe } from "@angular/common";
import { Subject } from 'rxjs';
import {Store, Action} from "@ngrx/store";

@Component({
    selector: `artist-playlist-app`,
    template: `
	<div id="layout" class="pure-g">
		<div class="sidebar pure-u-1 pure-u-md-1-4">
			<div class="header">
				<h1 class="brand-title">Audio Artist NGRX Store</h1>
				<h2 class="brand-tagline">Wiki Audio</h2>
			</div>
		</div>
		<div class="content pure-u-1">
		   <div class="pure-g">
		      <div class="pure-u-1-3">
                    <artist-list
                        [artistList]="(artistList | async)"
                        (createPlaylistItem)="audioServiceActions.createPlaylistItem($event)" 
                        >
                    </artist-list>
              </div>
		      <div class=" pure-u-1-3 custom-restricted-width">
                    <audio-list
                        [audioList]="(audioList | async)"
                        (playAudioItem)="actions$.next(playArtistAction($event))"
                        >
                    </audio-list>
              </div>
		    </div>
		</div>
	</div>
	`,
    directives: [ArtistList, AudioList],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistPlaylistApp{

    artistList: any;
    audioList: any;
    playlist:any;
    actions$ = new Subject<Action>();
    playArtistAction = playAudioItem;

    private subscription;


    constructor(public store: Store<any>,  private audioServiceActions:AudioServiceAction) {
        this.artistList   = store.let(artistAsArraySelector);
        /*this.playlist     = store.let(playlistArraySelector).subscribe((val) =>{
                                                                     console.log('[ArtistPlaylistApp] playlist  change',val)
                                                                   });*/
        this.audioList    = store.let(constructedPlaylistItem);
        /*this.subscription  = store.select('playlist').subscribe((val) =>{
                                                                     console.log('[ArtistPlaylistApp] subscription  change',val)
                                                                   });*/

        this.actions$.subscribe(store);
        this.actions$.next(getArtists());

    }

    ngOnDestroy() {
        this.store.unsubscribe();
    }

}
 */