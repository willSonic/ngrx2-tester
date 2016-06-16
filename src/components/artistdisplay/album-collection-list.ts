import { Component, Input,Output, EventEmitter  } from '@angular/core';

import {  Album } from '../../models';
import { AlbumDetailComponent, AlbumInput, RemoveOutput } from './album-detail';

export type AlbumsInput = AlbumInput[];
@Component({
    selector: 'album-collection-list',
    directives: [ AlbumDetailComponent ],
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
 