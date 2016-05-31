/**
 * Mocking client-server processing
 */
import {jsonArtists} from './artistsJSON';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/timer';


const TIMEOUT = 1000;

export default {

    getArtists(timeout:number): Observable<any> {
        console.log('artistAPI timeout ='+timeout);
        return Observable.of(jsonArtists)
            .delay(timeout || TIMEOUT);
    }
}
