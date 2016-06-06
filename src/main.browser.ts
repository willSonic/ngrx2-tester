import { bootstrap } from '@angular/platform-browser-dynamic';
import { HashLocationStrategy } from '@angular/common';
import { provideRouter } from '@ngrx/router';
import { provideStore } from '@ngrx/store';
import { provideDB } from '@ngrx/db';
import {PLATFORM_DIRECTIVES,provide,Input,Directive,HostBinding} from '@angular/core';
import {FlexDirective, LayoutDirective} from './components/layout';
import {MATERIAL_BROWSER_PROVIDERS} from 'ng2-material';
import { connectRouterToStore } from '@ngrx/router-store';
import { runEffects } from '@ngrx/effects';

import App from './app';
import routes from './routes';
import schema from './db-schema';
import reducer from './reducers';
import effects from './effects';
import services from './services';
import actions from './actions';



bootstrap(App, [
     MATERIAL_BROWSER_PROVIDERS,
    provide(PLATFORM_DIRECTIVES, { useValue: FlexDirective, multi: true}),
    provide(PLATFORM_DIRECTIVES, { useValue: LayoutDirective, multi: true}),

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
   * provideRouter sets up all of the providers for @ngrx/router. It accepts
   * an array of routes and a location strategy. By default, it will use
   * `PathLocationStrategy`.
   *
   * Source: https://github.com/ngrx/router/blob/master/lib/index.ts#L44-L51
   */
  provideRouter(routes, HashLocationStrategy),

  /**
   * connectRouterToStore configures additional providers that synchronize
   * router state with @ngrx/store. This lets you debug router state using
   * ngrx/store and to change the location by dispatching actions.
   */
   connectRouterToStore(),

  /**
   * provideDB sets up @ngrx/db with the provided schema and makes the Database
   * service everywhere.
   */
  provideDB(schema),


  /**
   * Finall we provide additional services and action creators so they can
   * be used by all of our components, effects, and guards.
   */
  services,
  actions
]);
