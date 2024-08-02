import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayingGameComponent } from './playing-game.component';
import { RoutePathEnum } from '@shared/types';

const routes: Routes = [
  {
    path: ':gameUuid',
    component: PlayingGameComponent,
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
export class PlayingGameRoutingModule { }
