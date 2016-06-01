import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";
import{ NgClass} from "@angular/common";
import {AudioItem} from "../models/audioitem";

@Component({
    selector: 'audio-item',
    directives: [NgClass],
    template: `
    <li class="margin-t-20">
        <h3>isPlaying == {{audioItem.isPlaying}}</h3>
        <button class="pure-button pure-button-primary" [ngClass]="{active: audioItem.isPlaying}"
            (click)="playAudioItem.emit(audioItem)">{{audioItem.artist.trackTitle}}
        </button>
    </li>
    `,
      styles: [`
        .active {
          background-color: red;
        }
      `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioItem {
    @Input()  audioItem: any;
    @Output() playAudioItem: EventEmitter<AudioItem> = new EventEmitter<AudioItem>();
}