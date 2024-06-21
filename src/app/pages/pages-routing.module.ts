import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-game',
    loadChildren: () => import('./create-game/create-game.module').then(m => m.CreateGameModule)
  },
  {
    path: 'join-game',
    loadChildren: () => import('./join-game/join-game.module').then(m => m.JoinGameModule)
  },
  {
    path: 'playing-game',
    loadChildren: () => import('./playing-game/playing-game.module').then(m => m.PlayingGameModule)
  },
  {
    path: '**',
    redirectTo: 'create-game',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
