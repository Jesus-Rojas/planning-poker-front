import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InputFieldVariantEnum } from './types';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent implements OnInit, OnChanges {
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

  classDescriptionText = '';
  classInput = '';
  classDisabled = '';
  classIsValid = '';
  classIsInvalid = '';

  updateClassDescriptionText() {
    const classesList = ['description-text', this.classDisabled, this.classIsInvalid, this.classIsValid];
    this.classDescriptionText = classesList.join(' ');
  }

  updateClassInput() {
    const classesList = [this.classIsInvalid, this.classIsValid];
    this.classInput = classesList.join(' ');
  }

  updateClassDisabled() {
    this.classDisabled = this.disabled ? 'disabled' : '';
  }

  updateClassIsValid() {
    this.classIsValid = this.isValid ? 'is-valid' : '';
  }

  updateClassIsInvalid() {
    this.classIsInvalid = this.isInvalid ? 'is-invalid' : '';
  }

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }

  ngOnInit(): void {
    this.updateClassDisabled();
    this.updateClassIsValid();
    this.updateClassIsInvalid();
    this.updateClassInput();
    this.updateClassDescriptionText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) this.updateClassDisabled();
    if (changes['isValid']) this.updateClassIsValid();
    if (changes['isInvalid']) this.updateClassIsInvalid();

    if (
      ['isInvalid', 'isValid'].some((prop) => changes[prop])
    ) this.updateClassInput();

    if (
      ['isInvalid', 'isValid', 'disabled'].some((prop) => changes[prop])
    ) this.updateClassDescriptionText();
  }
}
