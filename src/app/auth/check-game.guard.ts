import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { RoutePathEnum } from '@shared/types';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckGameGuard implements CanActivate {
  constructor(
    private gameService: GameService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const gameUuid: string = route.params['gameUuid'];
    return this.gameService.getGame(gameUuid).pipe(
      map(() => {
        this.localStorageService.updateGame(gameUuid);
        const userUuid = this.localStorageService.getUser();
        console.log(userUuid);

        if (!userUuid) return true;
        return this.router.createUrlTree([RoutePathEnum.PlayingGame, gameUuid]);
      }),
      catchError(() => {
        this.localStorageService.removeGame();
        return of(this.router.parseUrl(RoutePathEnum.CreateGame));
      })
    );
  }
}
