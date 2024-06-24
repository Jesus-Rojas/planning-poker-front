import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePathEnum } from './types/route-path.enum';

const routes: Routes = [
  {
    path: RoutePathEnum.CreateGame,
    loadChildren: () => import('./create-game/create-game.module').then(m => m.CreateGameModule)
  },
  {
    path: RoutePathEnum.JoinGame,
    loadChildren: () => import('./join-game/join-game.module').then(m => m.JoinGameModule)
  },
  {
    path: RoutePathEnum.PlayingGame,
    loadChildren: () => import('./playing-game/playing-game.module').then(m => m.PlayingGameModule)
  },
  {
    path: '**',
    redirectTo: RoutePathEnum.CreateGame,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
