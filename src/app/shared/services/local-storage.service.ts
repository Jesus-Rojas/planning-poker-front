import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private keyGame = 'game';

  removeGame() {
    window.localStorage.removeItem(this.keyGame);
  }

  updateGame(data: string) {
    window.localStorage.setItem(this.keyGame, data);
  }

  getGame() {
    return window.localStorage.getItem(this.keyGame);
  }
}
