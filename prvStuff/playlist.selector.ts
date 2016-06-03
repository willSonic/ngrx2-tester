let STORE_SLICE_NAME = 'playlist';
import { Observable } from 'rxjs';
import {artistSelector } from './artist.selector';

export const playlistArraySelector = (store: any) => store.select(STORE_SLICE_NAME)
                       .map(res => res.audioList);

export const constructedPlaylistItem = (store: any) => Observable
    .combineLatest(store.let(playlistArraySelector),
                   store.let(artistSelector))
    .map((res: any) => {
        console.log("[playlist.selector] --constructedPlaylistItem- playlistArraySelector --res[0] ", res[0]);
        return res[0].map(playlistItem => {  return Object.assign({},    playlistItem,
                                                                        {artist:Object.keys(res[1])
                                                                              .filter(keyVal => {return res[1][keyVal].id === playlistItem.artistId})
                                                                              .map( keyVal => { return res[1][keyVal]})[0] }
                                                                           );
                                                            });
    });
