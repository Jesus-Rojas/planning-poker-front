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
  @Input() value: string | null = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() descriptionText = '';
  @Input() variant: InputFieldVariantEnum.Dark = InputFieldVariantEnum.Dark;
  @Output() valueChange = new EventEmitter<string | null>();

  isInvalid = false;
  isValid = false;

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
