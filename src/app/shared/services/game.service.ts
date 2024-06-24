import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { RequestCreateGame } from '@shared/types/request-create-game.interface';
import { ResponseCreateGame } from '@shared/types/response-create-game.interface';

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
}
