import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { AudioTrack } from '../models';
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
    console.log("[SpotifyService]=---- query -- queryURL ="+queryURL);
    return this.http.request(queryURL).map((res: any) => res.json().tracks.items);
  }

  search(query: string, type: string): Observable<AudioArtist[]> {
        return this.query(`/search`, [ `query=${query}`, `type=${type}` ]);
   }
    //https://api.spotify.com/v1/search?q=kanye*&type=aritst
    //https://api.spotify.com/v1/search?q=kanye*&type=artist
    //'https://api.spotify.com/v1/search?query=kanye&offset=0&limit=10&type=track&market=US
   searchAudioArtist(query: string): Observable<any[]> {
    return this.search(query +'&offset=0&limit=10&', 'track&market=US');
   }

   retrieveAudioArtist(id: string): Observable<AudioArtist> {

     let queryURL: string =  `${SpotifyService.BASE_URL}${URL}`;
     return this.http.request(queryURL).map((res: any) => res.json());
   }
   /*
    https://api.spotify.com/v1/albums/0WAuEfa5Lmg72xfydLVcca/tracks?limit=2
   searchAudioTrack(query: string): Observable<AudioTrack[]> {
     return this.search(query, 'track');
   } 

  retrieveAudioTrack(id: string): Observable<AudioTrack[]> {
    return this.query(`/tracks/${id}`);
  }*/


}

