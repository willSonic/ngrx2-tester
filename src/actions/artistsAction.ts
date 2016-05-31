import {Action} from "@ngrx/store";
import { REQUEST_ARTISTS} from "../reducers/artistsReducer";

export const getArtists = () => {
    return <Action>{ type: REQUEST_ARTISTS };
}

export const currentArtist = () => {
    return <Action>{ type: REQUEST_ARTISTS };
}