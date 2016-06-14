import { Component, Input } from '@angular/core';

import { AudioArtist, Album } from '../../models';
import { AddCommasPipe } from '../../pipes/add-commas';
import { EllipsisPipe } from '../../pipes/ellipsis';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';


export type AudioArtistInput = AudioArtist;
export type AlbumInput =Album;

@Component({
  selector: 'audioartist-preview',
  pipes: [ AddCommasPipe, EllipsisPipe ],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ],
  styles: [`
    md-card {
      width: 400px;
      height: 300px;
      margin: 15px;
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
      width: 166px;
      height:130px;
      min-width: 83px;
      min-height: 65px;
      margin-left: 5px;
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
    md-card-footer {
      padding-bottom: 15px;
    }
  `],
  template: `
    <a [linkTo]=" '/album/' + id">
      <md-card>
        <md-card-title-group>
          <md-card-title>{{ artists | addCommas}}</md-card-title>
        </md-card-title-group>
        <md-card-content>
            <div layout="row" layout-align="center"> 
                     <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
             </div>
        </md-card-content>
         <md-card-footer>

          <h3 md-subheader>From the Album:</h3>
          <span>
                 {{albumTitle}}
          </span>
        </md-card-footer>
      </md-card>
    </a>
  `
})
export class AudioArtistPreviewComponent {
  @Input() audioArtist: AudioArtistInput;

  get id() {
    return this.audioArtist.id;
  }

  get artists() {
    return this.audioArtist.artists;
  }

  get albumTitle () {
    return this.audioArtist.album.name;
  }

  get thumbnail():string | boolean {
    if (this.audioArtist.album.images.length >0) {
      return this.audioArtist.album.images[1].url;
    }

    return false;
  }
}
