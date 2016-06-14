import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AudioArtist } from '../models';
import { Album } from '../models';


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
         console.log("[SpotifyService]=---- search");
        return this.query(`/search`, [ `query=${query}`, `type=${type}` ]);
   }
    //https://api.spotify.com/v1/search?q=kanye*&type=aritst
    //https://api.spotify.com/v1/search?q=kanye*&type=artist
    //'https://api.spotify.com/v1/search?query=kanye&offset=0&limit=10&type=track&market=US
   searchAudioArtist(query: string): Observable<any[]> {
    console.log("[SpotifyService]=---- searchAudioArtists");
    return this.search(query +'&offset=0&limit=10&', 'track&market=US');
   }

   retrieveAlbum(id: string): Observable<Album> {
        let queryURL: string =  `${SpotifyService.BASE_URL}`+'/albums/'+id+'/tracks?limit=2';
       console.log("[SpotifyService]=---- retrieveAlbum -- queryURL ="+queryURL);
       return this.http.request(queryURL).map((res: any) => res.json().items);
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

