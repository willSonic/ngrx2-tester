import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AudioTrack } from '../models';
import { AudioArtist } from '../models';

@Injectable()
export class SpotifyService {
  static BASE_URL: string = 'https://api.spotify.com/v1';

  constructor(private http: Http) {}

  query(URL:String, params?:Array<string>): Observable<any[]> {

     let queryURL: string =  `${SpotifyService.BASE_URL}${URL}`;

     if (params) {
         queryURL = `${queryURL}?${params.join('&')}`;
     }

    return this.http.request(queryURL).map((res: any) => res.json());
  }

  search(query: string, type: string): Observable<any[]> {
        return this.query(`/search`, [ `q=${query}`, `type=${type}` ]);
   }

   searchAudioArtist(query: string): Observable<AudioArtist[]> {
    return this.search(query, 'aritst');
  }


  searchAudioTrack(query: string): Observable<AudioTrack[]> {
    return this.search(query, 'track');
  }

  retrieveAudioTrack(id: string): Observable<AudioTrack[]> {
    return this.query(`/tracks/${id}`);
  }


}

