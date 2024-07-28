import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { GameService } from "@shared/services/game.service";
import { LocalStorageService } from "@shared/services/local-storage.service";
import { RoutePathEnum } from "@shared/types";
import { Observable, catchError, map, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CheckUserGuard implements CanActivate {
  constructor(
    private gameService: GameService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log(route);

    const gameUuid: string = route.params['gameUuid'];
    const userUuid = this.localStorageService.getUser();
    console.log({ gameUuid, userUuid });

    if (!userUuid) {
      return of(this.router.createUrlTree([RoutePathEnum.JoinGame, gameUuid]));
    }

    console.log('some error x2');

    return this.gameService.getUser(gameUuid, userUuid).pipe(
      tap(() => {
        console.log('upssss');
      }),
      map(() => true),
      catchError(() => {
        console.log('some error');

        this.localStorageService.removeUser();
        return of(this.router.parseUrl(RoutePathEnum.CreateGame));
      })
    );
  }
}
