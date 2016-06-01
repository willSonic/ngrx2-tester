import {Component, ChangeDetectionStrategy, SimpleChange,  OnChanges, Input, Output, EventEmitter} from "@angular/core";

import { AudioItem } from "../models/audioitem";

@Component({
    selector: 'audio-list',
    template: `
        <h1 class="brand-label">Track</h1>
        <ul  *ngIf="audioList" class="audio-list">
            <audio-item
                *ngFor="let audioItem of audioList"
                [audioItem]="audioItem"
                (playAudioItem)="playAudioItem.emit($event)">
            </audio-item>
        </ul>

    `,
    changeDetection:ChangeDetectionStrategy.OnPush,
    directives: [AudioItem]
})
export class AudioList implements OnChanges  {
    @Input() audioList: AudioItem[];
    @Output() playAudioItem = new EventEmitter<AudioItem>();



    ngOnChanges(changes:any){
    	console.log('[AudioListp]--------   Change detected:',changes);
    }

}