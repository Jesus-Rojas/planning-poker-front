import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create-game',
    loadComponent: () => import('./create-game-page/create-game-page.component').then(m => m.CreateGamePageComponent)
  },
  {
    path: 'join-game',
    loadComponent: () => import('./join-game-page/join-game-page.component').then(m => m.JoinGamePageComponent)
  },
  {
    path: 'playing-game',
    loadComponent: () => import('./playing-game-page/playing-game-page.component').then(m => m.PlayingGamePageComponent)
  },
  {
    path: '**',
    redirectTo: 'create-game',
  },
];
