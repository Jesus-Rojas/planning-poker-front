import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button-field',
  templateUrl: './radio-button-field.component.html',
  styleUrl: './radio-button-field.component.scss'
})
export class RadioButtonFieldComponent {
  @Input() name = '';
  @Input() value = '';
  @Input() selectedOption = '';
  @Output() selectedOptionChange = new EventEmitter<string>();

  onOptionChange() {
    this.selectedOptionChange.emit(this.selectedOption);
  }
}
