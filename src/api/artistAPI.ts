import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { jsonArtists } from './artistsJSON';
import { Observable } from 'rxjs/Observable';
import { Artist } from '../models';


const TIMEOUT = 1000;

@Injectable()
export class ArtistService {

    requestArtist(): Observable<Artist[]> {
        return Observable.of(jsonArtists)
            .delay(TIMEOUT).map(res => res.json());
    }
}
