import { Component, Input } from '@angular/core';

import { AudioArtistPreviewComponent, AudioArtistInput } from './audioArtist-preview';

export type AudioArtistInput = AudioArtistInput[];

@Component({
  selector: 'audioartist-preview-list',
  directives: [ AudioArtistPreviewComponent ],
  template: `
    <audioartist-preview *ngFor="let audioArtist of audioArtists" [audioArtist]="audioArtist"></audioartist-preview>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class AudioArtistPreviewListComponent {
  @Input() audioArtists: AudioArtistInput;
}
