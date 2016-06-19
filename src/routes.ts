import { Routes } from '@ngrx/router';
import { PlayListPage } from   './pages/playlist-page';
import { CollectionPage } from   './pages/collection-page';
import { AudioArtistFindPage } from './pages/audioartist-find-page';
import { AudioArtistViewPage } from './pages/audioartist-view-page';

import { AudioArtistExistsGuard, CollectionExistGuard  } from './guards';


const routes: Routes = [
  {
    path: '/',
    guards:[ CollectionExistGuard ],
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        console.log('Go To CollectionPage')
        resolve(require('./pages/collection-page').CollectionPage);
      });
    }),
    components:{
      main: CollectionPage,
      sideMenu: PlayListPage
    }
  },
  {
    path: '/audioArtist/find',
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        resolve(require('./pages/audioartist-find-page').AudioArtistFindPage);
      });
    }),
    components:{
      main: AudioArtistFindPage,
      sideMenu: PlayListPage
    }
  },
  {
    path: '/album/:trackId',
    guards: [ AudioArtistExistsGuard ],
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        resolve(require('./pages/audioartist-view-page').AudioArtistViewPage);
      });
    }),
    components:{
      main: AudioArtistViewPage,
      sideMenu: PlayListPage
    }
  },
  {
    path: '/*',
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        resolve(require('./pages/not-found-page').NotFoundPage);
      });
    })
  }
];

export default routes;
