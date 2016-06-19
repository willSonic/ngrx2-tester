import {Album} from './audio-artist-model'

export interface AudioTrack {
    id: string;
    album:Album,
    artistAudioBuffer: ArrayBuffer;
    downloadComplete:boolean;
    isPlaying:boolean;
    currentPosition:number;
}