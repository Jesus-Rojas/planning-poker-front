import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrl: './dropdown-field.component.scss'
})
export class DropdownFieldComponent {
  @Input() placeholder = 'Selecciona una opción';
  @Input() options: string[] = [];
  @Input() selectedOption: string | null = null;
  @Output() selectedOptionChange = new EventEmitter<string>();
  dropdownOpen = false;

  constructor(private elementRef: ElementRef) {}

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string): void {
    if (this.selectedOption === option) return;
    this.selectedOption = option;
    this.dropdownOpen = false;
    this.selectedOptionChange.emit(option);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
