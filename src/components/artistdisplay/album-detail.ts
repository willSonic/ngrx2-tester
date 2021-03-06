import { Component, Input, Output,ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import {  Album } from '../../models';
import { AddCommasPipe } from '../../pipes/add-commas';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdButton } from '@angular2-material/button';

/**
 * Tip: Export type aliases for your component's inputs and outputs. Until we
 * get better tooling for templates, this helps enforce you are using a
 * component's API with type safety.
 */
export type AlbumInput = Album;
export type InCollectionInput = boolean;
export type AddOutput = Album;
export type RemoveOutput = Album;

@Component({
  selector: 'audioartist-detail',
  pipes: [ AddCommasPipe ],
  directives: [ MD_CARD_DIRECTIVES, MD_LIST_DIRECTIVES, MdButton ],
  template: `
    <md-card>
      <md-card-title-group>
        <md-card-title>{{ albumName }}</md-card-title>
      </md-card-title-group>
      <md-card-content>
        <div layout="row" layout-align="center"> 
         <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/> 
        </div>
      </md-card-content>
      <md-card-actions align="end">
        <button md-raised-button color="warn" *ngIf="inCollection" (click)="removeFromCollection.emit(album)">
           Remove Audio Artist from Collection
        </button>
        <button md-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(album)">
           Add Audio Artist to Collection
        </button>
      </md-card-actions>
    </md-card>

  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    md-card {
      max-width: 600px;
      margin: 15px;
      background-color:#5f84a5;
    }
    md-card-title {
      margin-left: 10px;
       color: #EBEBEB;
    }
    img {
      width: 300px;
      height:220px;
      min-width: 300px;
      min-height:220px;
      margin-left: 5px;
    }
    md-card-content {
      margin-top: 15px;
      margin-bottom: 125px;
    }
    md-card-footer {
      padding-bottom: 75px;
    }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent {
  /**
   * Dumb components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'dumb' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   *
   * Tip: Utilize getters to keep templates clean in 'dumb' components.
   */
  @Input() album: AlbumInput;
  @Input() inCollection: InCollectionInput;
  @Output() removeFromCollection: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() add = new EventEmitter<AddOutput>();

  get id() {
    return this.album.id;
  }

  get albumName() {
    console.log("[AlbumDetailComponent] ===inCollection ,"+this.inCollection)
    console.log("[AlbumDetailComponent] ===albumName ", this.album)
    return this.album.name;
  }
    
   /*

  get genres() {
    return this.audioArtist.album.genres;
  }

get description() {
    return this.book.volumeInfo.description;
  }

  get authors() {
    return this.book.volumeInfo.authors;
  }
*/
 get thumbnail():string | boolean {
    if (this.album.images.length >0) {
      return this.album.images[1].url;
    }

    return false;
  }
}
