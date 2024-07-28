import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinGameComponent } from './join-game.component';
import { CheckGameGuard } from '@auth/check-game.guard';
import { RoutePathEnum } from '@shared/types';

const routes: Routes = [
  {
    path: ':gameUuid',
    component: JoinGameComponent,
    // canActivate: [CheckGameGuard],
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
