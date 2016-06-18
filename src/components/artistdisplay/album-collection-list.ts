import { Component, Input,Output, EventEmitter  } from '@angular/core';

import { IndexOf } from '../../pipes/index-of';
import {  Album } from '../../models';
import { AlbumDetailComponent } from './album-detail';

export type AlbumsInput = Album[];
export type AreInCollectionInput = string[];
@Component({
    selector: 'album-collection-list',
    directives: [ AlbumDetailComponent ],
    pipes: [ IndexOf ],
    template: `
    <audioartist-detail 
      [inCollection]="true"
      (removeFromCollection)="removeFromCollection.emit($event)"
       *ngFor="let album  of albums" [album]="album"></audioartist-detail>
  `,
    styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class AlbumCollectionListComponent {
    @Input() albums: AlbumsInput;
    @Output() removeFromCollection = new EventEmitter<Album>();
}
 