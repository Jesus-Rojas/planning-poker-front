import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { DesignSystemModule } from '../../design-system/design-system.module';

@Component({
  selector: 'app-create-game-page',
  standalone: true,
  imports: [CoreModule, DesignSystemModule],
  templateUrl: './create-game-page.component.html',
  styleUrl: './create-game-page.component.scss'
})
export class CreateGamePageComponent {

}
