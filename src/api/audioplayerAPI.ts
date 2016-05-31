import {Injectable, bind} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import { AudioItem } from '../models';

@Injectable()
export class AudioPlayerService{

    private audioContext: AudioContext;
    private audioNode:AudioBufferSourceNode;
    private audioBuffer: AudioBuffer;
    private playbackRate: number = 1.0;
    private gainNode:GainNode;
    private gain: number = .01;


    constructor() {
        this.audioContext = new AudioContext();
    }



    loadAudio(audioItem:any): Observable<any[]>  {
        var ref = this;
        console.log("[AudioPlayerService] loadAudio  -----  =", audioItem.artistAudioBuffer.audioBuffer);
        if(this.audioBuffer) {
          if(this.audioNode ) {
            this.audioNode.stop(0);
          }
        }
        return Observable.create(observer=> {
            this.audioContext.decodeAudioData( audioItem.artistAudioBuffer.audioBuffer, function(buffer){
              ref.audioBuffer = buffer;
              observer.next(ref.audioBuffer);
              observer.complete();
            });

         });
    }

    playBuffer(): Array<any> {
            this.audioNode = this.audioContext.createBufferSource();
            this.audioNode.buffer = this.audioBuffer;
            this.audioNode.playbackRate.value = this.playbackRate;
    
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = this.gain;
    
            this.audioNode.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
    
            this.audioNode.start(0);
            return [ {'playStart':true}];
    }

    stopBuffer(): Array<any>{
           if(this.audioBuffer) {
              if(this.audioNode ) {
                this.audioNode.stop(0);
                this.audioNode = null;
              }
            }
            return [ {'playStop':true}];
    }

}
