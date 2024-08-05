import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownFieldComponent } from './dropdown-field.component';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

describe('DropdownFieldComponent', () => {
  let component: DropdownFieldComponent;
  let fixture: ComponentFixture<DropdownFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownFieldComponent],
      providers: [
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.placeholder).toBe('Selecciona una opción');
    expect(component.options).toEqual([]);
    expect(component.selectedOption).toBeNull();
  });

  it('should toggle dropdown on click', () => {
    const dropdownToggleSpy = jest.spyOn(component, 'toggleDropdown');
    const dropdownElement = fixture.debugElement.query(By.css('.select-wrapper'));

    dropdownElement.triggerEventHandler('click', new Event('click'));
    expect(dropdownToggleSpy).toHaveBeenCalled();
    expect(component.dropdownOpen).toBe(true);

    dropdownElement.triggerEventHandler('click', new Event('click'));
    expect(component.dropdownOpen).toBe(false);
  });

  describe('Test for selectOption', () => {
    it('should select option and close dropdown', () => {
      const option = 'Option 1';
      const selectOptionSpy = jest.spyOn(component, 'selectOption');
      component.options = [option];
      fixture.detectChanges();

      component.selectOption(option);
      expect(selectOptionSpy).toHaveBeenCalledWith(option);
      expect(component.selectedOption).toBe(option);
      expect(component.dropdownOpen).toBe(false);
    });

    it('should emit selected option change', () => {
      const option = 'Option 1';
      const emitSpy = jest.spyOn(component.selectedOptionChange, 'emit');

      component.selectOption(option);
      expect(emitSpy).toHaveBeenCalledWith(option);
    });

    it('should not emit selected option change if option is the same', () => {
      const option = 'Option 1';
      const emitSpy = jest.spyOn(component.selectedOptionChange, 'emit');
      component.selectedOption = option;

      component.selectOption(option);
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });



  it('should close dropdown when clicking outside', () => {
    component.dropdownOpen = true;
    fixture.detectChanges();

    document.dispatchEvent(new Event('click'));
    expect(component.dropdownOpen).toBe(false);
  });
});
