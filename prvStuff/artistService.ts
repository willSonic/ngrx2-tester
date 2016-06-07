import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { jsonArtists } from './artistsJSON';
import { Observable } from 'rxjs/Observable';
import { AudioArtist } from '../models/audio-artist-model';


const TIMEOUT = 1000;

@Injectable()
export class ArtistService {

    requestArtist():Observable<any> {
        return Observable.of(jsonArtists).delay(TIMEOUT).map(res => res.json());
    }
}
