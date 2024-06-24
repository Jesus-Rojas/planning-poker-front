import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrl: './join-game.component.scss'
})
export class JoinGameComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) { }

  private subscriptions = new Subscription();
  gameUuid: string | null = null;

  ngOnInit() {
    this.localStorageService.removeGame();
    const paramMapSubscription = this.activatedRoute.paramMap.subscribe((params) => {
      const gameUuid = params.get('gameUuid') ?? '';
      this.gameUuid = gameUuid;
      this.localStorageService.updateGame(gameUuid);
    });
    this.subscriptions.add(paramMapSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
