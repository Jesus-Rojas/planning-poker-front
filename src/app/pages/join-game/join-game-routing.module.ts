import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinGameComponent } from './join-game.component';
import { RoutePathEnum } from '@shared/types';

const routes: Routes = [
  {
    path: ':gameUuid',
    component: JoinGameComponent,
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
export class JoinGameRoutingModule { }
