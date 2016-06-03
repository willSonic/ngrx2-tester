import {createSaga, Saga, whenAction, toPayload} from 'store-saga';
import {REQUEST_ARTISTS, RECEIVED_ARTISTS} from '../reducers/artistsReducer';
import {CREATE_AUDIODATA}from '../reducers/audioReducer';
import {ADD_AUDIOITEM_TO_PLAYLIST, UPDATE_AUDIOITEM_IN_PLAYLIST} from '../reducers/playlistReducer';
import {PLAY_INITIATED, PLAY_START, PLAY_STOP} from '../reducers/audioplayerReducer';
import  * as ArtistAPI from  '../../api/artistAPI';
import  * as DataLoadAPI  from  '../../api/dataloadAPI';
import { WebAudioPlayerAPI } from '../../api/webaudioAPI';
import { Observable } from 'rxjs/Observable';



const artistFetch = createSaga( function(){
    return iteration$ => iteration$
         .filter(whenAction(REQUEST_ARTISTS))
         .mergeMap(()  => ArtistAPI.default.getArtists(300))
         .map(res => {
                return {
                    type: RECEIVED_ARTISTS,
                    payload: res
               };
         });
});


const createPlayListItem = createSaga( function sagaFactory() {
        return function someService(iteration$: Observable<any>) {
    return iteration$ .filter(whenAction(CREATE_AUDIODATA))
        .mergeMap((iteration) => {
            if(iteration.state.audioItem){
                 var trackURL = Object.keys(iteration.state.artists)
                                        .filter( x =>  {
                                               return iteration.state.artists[x].id  ===  iteration.state.audioItem.artistId})
                                          .map(x => {return iteration.state.artists[x]})[0].trackURL;

                return  DataLoadAPI.default.getTrack(trackURL)
                    .map((res) => {
                        return {
                            type: ADD_AUDIOITEM_TO_PLAYLIST,
                            payload:  Object.assign({},
                                                    iteration.state.audioItem,
                                                    {artistAudioBuffer:res})
                        };
                    })
            }else{
               return iteration.state;

            }
        });
        }
});



const loadAudioItem = createSaga(
    function sagaFactory(webAudioPlayer: WebAudioPlayerAPI) {
        return function playerServices(iteration$: Observable<any>) {
             return iteration$.filter(whenAction(PLAY_INITIATED))
                             .mergeMap((iteration) => {
                                 return  webAudioPlayer.loadAudio(iteration.action.payload)
                                        .map((res) => {
                                                 return {
                                                    type: PLAY_START,
                                                    payload: iteration.action.payload
                                                };
                                        })

             });
        };
    },
    [WebAudioPlayerAPI] );

const playAudioItem = createSaga(
    function sagaFactory(webAudioPlayer: WebAudioPlayerAPI) {
        return function playerServices(iteration$: Observable<any>) {
             return iteration$.filter(whenAction(PLAY_START))
                              .mergeMap((iteration) => {
                                  return webAudioPlayer.playBuffer().map(res => {
                                      return {
                                        type: UPDATE_AUDIOITEM_IN_PLAYLIST,
                                        payload:  Object.assign({},
                                                        iteration.action.payload,
                                                        {isPlaying:res.playStart})
                                    };
                        })

             });
        };
    },
    [WebAudioPlayerAPI] );

const stopAudioItem = createSaga(
    function sagaFactory(webAudioPlayer: WebAudioPlayerAPI) {
        return function playerServices(iteration$: Observable<any>) {
             return iteration$.filter(whenAction(PLAY_STOP))
                              .mergeMap((iteration) => {
                                  return webAudioPlayer.stopBuffer().map(res => {
                                 return {
                                    type: UPDATE_AUDIOITEM_IN_PLAYLIST,
                                    payload:  Object.assign({},
                                                    iteration.action.payload,
                                                    {isPlaying:res.playStart})
                                  };
                        })

             });
        };
    },
    [WebAudioPlayerAPI] );

export default [
    artistFetch,
    createPlayListItem,
    loadAudioItem,
    playAudioItem,
    stopAudioItem
];