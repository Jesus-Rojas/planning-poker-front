import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { RequestCreateGame, ResponseCreateGame } from '@shared/types';
import { RequestJoinGame } from '@shared/types/request-join-game.interface';
import { ResponseJoinGame } from '@shared/types/response-join-game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl = environment.API_URL + '/games';

  constructor(
    private httpClient: HttpClient
  ) { }

  createGame(name: string) {
    const body: RequestCreateGame = { name };
    return this.httpClient.post<ResponseCreateGame>(this.baseUrl + '/create', body);
  }

  joinGame(gameUuid: string, name: string) {
    const body: RequestJoinGame = { name };
    const route = `${this.baseUrl}/join/${gameUuid}`;
    return this.httpClient.post<ResponseJoinGame>(route, body);
  }
}
