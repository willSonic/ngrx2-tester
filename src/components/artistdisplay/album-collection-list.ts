import { Component, Input } from '@angular/core';

import { AlbumDetailComponent, AlbumInput } from './album-detail';

export type AlbumsInput = AlbumInput[];

@Component({
    selector: 'album-collection-list',
    directives: [ AlbumDetailComponent ],
    template: `
    <audioartist-detail *ngFor="let album  of albums" [albums]="albums"></audioartist-detail>
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
}
 