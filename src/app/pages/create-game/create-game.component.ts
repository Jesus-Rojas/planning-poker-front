import { Component } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent {
  showLoader = false;

  ngOnInit() {
    // setTimeout(() => (this.showLoader = !this.showLoader), 3000);
  }
}
