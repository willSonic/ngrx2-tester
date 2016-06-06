import { Component, Input } from '@angular/core';

import { AudioArtist } from '../../models';
import { AddCommasPipe } from '../../pipes/add-commas';
import { EllipsisPipe } from '../../pipes/ellipsis';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';


export type AudioArtistInput = AudioArtist;

@Component({
  selector: 'audioartist-preview',
  pipes: [ AddCommasPipe, EllipsisPipe ],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ],
  template: `
    <a [linkTo]=" '/audioArtist/' + id">
      <md-card>
        <md-card-title-group>
          <md-card-title>{{ name }}</md-card-title>
          <!--<md-card-subtitle *ngIf="subtitle">{{ subtitle }}</md-card-subtitle>
          <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>-->
        </md-card-title-group>
        <md-card-content>
          <p *ngIf="description">{{ description | ellipsis }}</p>
        </md-card-content>
       <!-- <md-card-footer>
          <h5 md-subheader>Written By:</h5>
          <span>
            {{ authors | addCommas }}
          </span>
        </md-card-footer>-->
      </md-card>
    </a>
  `,
  styles: [`
    md-card {
      width: 400px;
      height: 300px;
      margin: 15px;
    }
    md-card-title {
      margin-right: 10px;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin-top: 15px;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    md-card-footer {
      padding-bottom: 25px;
    }
  `]
})
export class AudioArtistPreviewComponent {
  @Input() audioArtist: AudioArtistInput;

  get id() {
    return this.audioArtist.id;
  }

  get name() {
    return this.audioArtist.name;
  }

/*  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get authors() {
    return this.book.volumeInfo.authors;
  }

  get thumbnail(): string | boolean {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail;
    }

    return false;
  }*/
}
