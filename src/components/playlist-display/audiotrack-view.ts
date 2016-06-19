import { Component, Input } from '@angular/core';

import { AudioTrack } from '../../models';
import { AddCommasPipe } from '../../pipes/add-commas';
import { EllipsisPipe } from '../../pipes/ellipsis';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';


export type AudioTrackInput = AudioTrack;

@Component({
  selector: 'audio-item-view',
  pipes: [ AddCommasPipe, EllipsisPipe ],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ],
  styles: [`
    md-card {
      width: 250px;
      height: 125px;
      margin: 5px;
      background-color:#5f84a5;
    }
    md-card-title {
      margin-right: 10px;
      padding:0 10px 0;
    }
    
    a {
      color: #EBEBEB;
      text-decoration: none;
    }
    p {
       font-size: 1.2em;
       font-weight:300;
       color: #EBEBEB;
       margin-left:10px;
    }
    img {
      width: 70px;
      height:65px;
      margin-left: 2px;
    }
    md-card-content {
      margin-top: 5px;
    }
    span {
       display: inline-block;
       font-weight:300;
       font-size: 1em;
       color: #EBEBEB;
       margin-left:10px;
    }
  `],
  template: `
      <md-card>
        <md-card-title-group>
          <md-card-title>{{ albumTitle | EllipsisPipe}}</md-card-title>
        </md-card-title-group>
        <md-card-content>
            <div layout="row" layout-align="center"> 
                     <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
             </div>
        </md-card-content>
      </md-card>
  `
})
export class AudioTrackViewComponent {
  @Input() audioTrack: AudioTrackInput;

  get albumTitle () {
    return this.audioTrack.album.name;
  }

  get thumbnail():string | boolean {
    if (this.audioTrack.album.images.length >0) {
      return this.audioTrack.album.images[2].url;
    }

    return false;
  }
}
