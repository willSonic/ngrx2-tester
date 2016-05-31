import {Injectable} from "@angular/core";
import {Store, Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
//import {playlist} from "../reducers/playlistReducer";
//import {CREATE_AUDIODATA, REQUEST_AUDIODATA, IAudiodata} from "../reducers/audioReducer";
import { Artist } from '../models';
import { AudioItem } from '../models';


@Injectable()
export class AudioItemAction {
    static CREATE_AUDIOITEM = '[AudioItem] Search Complete';

    private actions$: Subject<Action> = new Subject<Action>();
    private playlist:any;
    private storeSubscription;
    constructor(  private _store : Store<any>){

            this.storeSubscription  = _store.select('playlist')
                                            .subscribe( (playlist) =>  { this.playlist = playlist });

            const createPlaylistItem =  this.actions$
                                            .filter((action : Action) => action.type === AudioItemAction.CREATE_AUDIOITEM);

            Observable.from(createPlaylistItem).subscribe(_store);
    }

    createPlaylistItem = (artist : Artist) => {
        //console.log('[AudioServiceAction] ----   createPlaylistItem   artist = ', artist);
       //console.log('[AudioServiceAction] ----   createPlaylistItem   this.playlist.audioList = ', this.playlist.audioList);
        if(this.shouldAddToPlaylist(artist)){
            this.actions$.next({type: AudioItemAction.CREATE_AUDIOITEM, payload: artist });
        }else{
            this.actions$.next({type: '', payload: {} });
        }
    }


    private shouldAddToPlaylist(artist:Artist):boolean{
        var addToPlayList = this.playlist.audioList.find( (item)=> {  return item.artistId === artist.id });
        return !addToPlayList?true:false;
    }
}