import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.development';
import { DisplayModeEnum, Game, GameStatusEnum, RequestCreateGame, ResponseCreateGame, ResponseRevealCards, RoutePathEnum } from '@shared/types';
import { RequestJoinGame } from '@shared/types/request-join-game.interface';
import { ResponseJoinGame } from '@shared/types/response-join-game.interface';
import { catchError, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl = environment.API_URL + '/games';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
  ) { }

  createGame(name: string) {
    const body: RequestCreateGame = { name };
    return this.httpClient.post<ResponseCreateGame>(this.baseUrl + '/create', body);
  }

  joinGame(gameUuid: string, name: string, displayMode: DisplayModeEnum) {
    const body: RequestJoinGame = { name, displayMode };
    const route = `${this.baseUrl}/join/${gameUuid}`;
    return this.httpClient.post<ResponseJoinGame>(route, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          this.toastService.showErrorToast(error.error.message);
          this.localStorageService.removeGame();
          this.router.navigate([RoutePathEnum.CreateGame]);
        }
        return throwError(() => error);
      })
    );
  }

  getGame(gameUuid: string) {
    return this.httpClient.get<Game>(this.baseUrl + `/${gameUuid}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          this.toastService.showErrorToast(error.error.message);
          this.localStorageService.removeGame();
          this.router.navigate([RoutePathEnum.CreateGame]);
        }
        return throwError(() => error);
      })
    );
  }

  getUser(gameUuid: string, userUuid: string) {
    return this.httpClient.get(this.baseUrl + `/${gameUuid}/users/${userUuid}`);
  }

  updateMeCardSelected(gameUuid: string, userUuid: string, cardSelected: string) {
    return this.httpClient.put<void>(this.baseUrl + `/${gameUuid}/users/${userUuid}`, { cardSelected });
  }

  updateStatus(gameUuid: string, status: GameStatusEnum) {
    return this.httpClient.put<void>(this.baseUrl + `/${gameUuid}/status`, { status });
  }

  revealCards(gameUuid: string) {
    return this.httpClient.post<ResponseRevealCards>(this.baseUrl + `/${gameUuid}/reveal-cards`, {});
  }

  resetGame(gameUuid: string) {
    return this.httpClient.post<ResponseRevealCards>(this.baseUrl + `/${gameUuid}/reset`, {});
  }
}
