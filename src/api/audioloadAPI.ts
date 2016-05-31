import {Injectable, provide} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from 'rxjs';
import "rxjs/Rx";

@Injectable()
export class AudioDataLoadService {
    loadAudioItemData(URL:string): Observable<any[]> {
        return Observable.create(observer=> {
            let req = new XMLHttpRequest();
            req.open('get', URL);
            req.responseType = "arraybuffer";
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    var audioData= { "audioBuffer":req.response};
                    observer.next(audioData);
                    //console.log("audioData", audioData);
                    observer.complete();
                }
            };
            req. send();
        });

    }
}
