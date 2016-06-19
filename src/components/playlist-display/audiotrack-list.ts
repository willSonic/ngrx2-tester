import { Component, Input } from '@angular/core';

import {AudioTrackViewComponent, AudioTrackInput } from './audiotrack-view';

export type AudioTracksInput = AudioTrackInput[];
@Component({
  selector: 'audiotrack-list',
  directives: [ AudioTrackViewComponent ],
  template: `
    <audiotrack-preview *ngFor="let audioTrack of playList" [audioTrack]="audioTrack"></audiotrack-preview>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class AudioTrackListComponent {
  @Input() audioTrack: AudioTrackInput;
}
