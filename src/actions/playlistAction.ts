import {Action} from "@ngrx/store";
import { ADD_AUDIOITEM_TO_PLAYLIST } from "../reducers/playlistReducer";
import {IArtist} from "../reducers/artistsReducer";


export const addAudioItemToPlaylist = (artist: IArtist) => {
    console.log(" playlistAction -- artist =", artist);
    return <Action>{ type:ADD_AUDIOITEM_TO_PLAYLIST, payload: artist };
}
