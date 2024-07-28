import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private keyGame = 'game';
  private keyUser = 'user';

  removeGame() {
    window.localStorage.removeItem(this.keyGame);
  }

  updateGame(value: string) {
    window.localStorage.setItem(this.keyGame, value);
  }

  getGame() {
    return window.localStorage.getItem(this.keyGame);
  }

  removeUser() {
    window.localStorage.removeItem(this.keyUser);
  }

  updateUser(value: string) {
    window.localStorage.setItem(this.keyUser, value);
  }

  getUser() {
    return window.localStorage.getItem(this.keyUser);
  }
}
