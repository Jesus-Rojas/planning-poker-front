import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesignSystemModule } from '@design-system/design-system.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DesignSystemModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'planning-poker';
}
