import { Routes } from '@ngrx/router';

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
    })
  },
  {
    path: '/audioArtist/find',
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        resolve(require('./pages/audioartist-find-page').AudioArtistFindPage);
      });
    })
  },
  {
    path: '/album/:id',
    guards: [ AudioArtistExistsGuard ],
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        resolve(require('./pages/audioartist-view-page').AudioArtistViewPage);
      });
    })
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
