import { Routes } from '@ngrx/router';

import { AudioArtistExistsGuard } from './guards';


const routes: Routes = [
  {
    path: '/',
    guards: [ AudioArtistExistsGuard ],
    loadComponent: () => new Promise(resolve => {
      console.log('[AudioArtistExistGuard] --- loadComponent --- resolve', resolve);
      (require as any).ensure([], require => {
        resolve(require('./pages/collection').CollectionPage);
      });
    })
  },
  {
    path: '/audioArtist/find',
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        resolve(require('./pages/audio-artist-find').AudioArtistFindPage);
      });
    })
  },
  {
    path: '/audioArtist/:id',
    guards: [ AudioArtistExistsGuard ],
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        resolve(require('./pages/audio-artist-view').AudioArtistViewPage);
      });
    })
  },
  {
    path: '/*',
    loadComponent: () => new Promise(resolve => {
      (require as any).ensure([], require => {
        resolve(require('./pages/not-found').NotFoundPage);
      });
    })
  }
];

export default routes;
