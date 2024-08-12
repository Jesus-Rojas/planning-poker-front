import { Routes } from '@angular/router';
import { PageComponent } from '@core/components/page/page.component';
import { RoutePathEnum } from '@shared/types';

export const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: RoutePathEnum.CreateGame,
        loadChildren: () => import('./pages/create-game/create-game.module').then(m => m.CreateGameModule)
      },
      {
        path: RoutePathEnum.JoinGame,
        loadChildren: () => import('./pages/join-game/join-game.module').then(m => m.JoinGameModule)
      },
      {
        path: RoutePathEnum.PlayingGame,
        loadChildren: () => import('./pages/playing-game/playing-game.module').then(m => m.PlayingGameModule)
      },
      {
        path: RoutePathEnum.SignIn,
        loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: RoutePathEnum.SignUp,
        loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
      },
      {
        path: '**',
        redirectTo: RoutePathEnum.CreateGame,
      },
    ],
  },
];
