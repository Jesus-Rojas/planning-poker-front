import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldVariantEnum } from './types';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @Input() headerText = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() descriptionText = '';
  @Input() variant: InputFieldVariantEnum.Dark = InputFieldVariantEnum.Dark;
  @Input() isInvalid = false;
  @Input() isValid = false;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
