import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from "@angular/core";

import {ArtistItem} from "./artist-item";
import {Artist} from "../models/artist";
 
@Component({
    selector: 'artist-list',
    template: `
        <h1 class="brand-label">Artist</h1>
        <ul *ngIf="artistList" class="pure-menu-list">
            <artist-item
                (createPlaylistItem)="createPlaylistItem.emit($event)"
                *ngFor="let artistItem of artistList"
                [artistItem]="artistItem"
                >
            </artist-item>
        </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [ArtistItem]
})

export class ArtistList {
    @Input() artistList: Artist[];
    @Output() createPlaylistItem = new EventEmitter<Artist>();
}