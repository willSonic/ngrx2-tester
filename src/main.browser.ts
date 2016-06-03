import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideStore } from '@ngrx/store';
import {provideStore} from "@ngrx/store";
import {APP_REDUCERS} from "./reducers/reducers";
import { runEffects } from '@ngrx/effects';

import App from './app'
import reducer from './reducers';
import effects from './effects';
import services from './services';
import actions from './actions';
/*import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS, BrowserXhr} from '@angular/http';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser/index';
import {ArtistPlaylistApp} from './artistPlaylist-app';
import {AudioServiceAction} from './actions/audioServiceAction';
import {provideStore, usePreMiddleware, usePostMiddleware, Middleware} from "@ngrx/store";
import {APP_REDUCERS} from "./reducers/reducers";
import {APP_SAGAS} from "./sagas/sagas";
import audiomachineSagas from "./sagas/audiomachine";
import {installSagaMiddleware} from 'store-saga';


import { apiInjectables } from '../services';


import {CustomBrowserXhr} from '../util/custom.xhr';

const actionLog : Middleware = action => {
    return action.do(val => {
        console.warn('DISPATCHED ACTION: ', val)
    });
};

const stateLog : Middleware = state => {
    return state.do(val => {
        console.info('NEW STATE: ', val)
    });
};


export function main() {
  return bootstrap(ArtistPlaylistApp, [
      apiInjectables,
      ELEMENT_PROBE_PROVIDERS,
      HTTP_PROVIDERS,
      AudioServiceAction,
      provide(BrowserXhr, { useClass: CustomBrowserXhr }),
      provideStore(APP_REDUCERS),
      usePreMiddleware(actionLog),
      usePostMiddleware(stateLog),
      installSagaMiddleware(...audiomachineSagas)
  ])
  .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
*/
bootstrap(App, [
  /**
   * provideStore is run once at application bootstrap, accepting a reducer
   * function or object map of reducer functions. If passed an object of
   * reducers, combineReducers will be run creating your application
   * meta-reducer. This returns all providers for an @ngrx/store
   * based application.
   *
   * Source: https://github.com/ngrx/store/blob/master/src/ng2.ts#L43-L69
   */
  provideStore(reducer),

  /**
   * runEffects configures all providers for @ngrx/effects. Observables decorated
   * as an @Effect() within the supplied services will ultimately be merged,
   * with output of relevant (registered as effects) actions being
   * dispatched into your application store. Any side-effects in
   * your application should be registered as effects.
   *
   * Source: https://github.com/ngrx/effects/blob/master/lib/run-effects.ts#L8-L20
   */
  runEffects(effects),


  /**
   * connectRouterToStore configures additional providers that synchronize
   * router state with @ngrx/store. This lets you debug router state using
   * ngrx/store and to change the location by dispatching actions.
   */
  //connectRouterToStore(),


  /**
   * Finall we provide additional services and action creators so they can
   * be used by all of our components, effects, and guards.
   */
  services,
  actions
]);
