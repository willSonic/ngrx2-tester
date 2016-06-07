import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";
import {AudioArtist} from "../models/audio-artist-model";


//

@Component({
    selector: 'artist-item',
    template: `
    <li class="margin-t-20 pure-menu-item">
          <div class="media conversation">
            <div class="media-body">
              <h3 class="media-heading contact-name">{{artistItem.artistName}}
                <span *ngIf="selected">&bull;</span>
                <small class="track-title">{{artistItem.trackTitle}}</small>
              </h3>
            </div>
            <div class="pull-left">
                  <a (click)="createPlaylistItem.emit(artistItem)" class="video-thumbnail">
                      <img class="media-object avatar video-mask"  src="{{artistItem.albumImgSrc}}">
                      
                      <div class="play-icon"></div>
                   </a>
            </div>
          </div>
    </li>
    `,
})
export class ArtistItem {
    @Input()  artistItem: AudioArtist;
    @Output() createPlaylistItem: EventEmitter<AudioArtist> = new EventEmitter<AudioArtist>();
}