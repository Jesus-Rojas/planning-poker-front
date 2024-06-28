import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayingGameComponent } from './playing-game.component';

const routes: Routes = [
  {
    path: ':gameUuid',
    component: PlayingGameComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayingGameRoutingModule { }
