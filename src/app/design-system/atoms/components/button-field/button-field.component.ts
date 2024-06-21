import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrl: './button-field.component.scss'
})
export class ButtonFieldComponent {
  @Input() type = 'button';
}
