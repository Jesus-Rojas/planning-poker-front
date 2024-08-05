import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFieldComponent } from './button-field.component';
import { ButtonFieldColorEnum, ButtonFieldIconEnum, ButtonFieldSizeEnum, ButtonFieldVariantEnum } from './types';

describe('ButtonFieldComponent', () => {
  let component: ButtonFieldComponent;
  let fixture: ComponentFixture<ButtonFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.variant).toBe(ButtonFieldVariantEnum.Primary);
    expect(component.size).toBe(ButtonFieldSizeEnum.Medium);
    expect(component.color).toBe(ButtonFieldColorEnum.DarkPurple);
    expect(component.icon).toBe(ButtonFieldIconEnum.None);
    expect(component.disabled).toBe(false);
    expect(component.type).toBe('button');
  });

  it('should update classVariant on variant change', () => {
    component.variant = ButtonFieldVariantEnum.Secondary;
    component.ngOnChanges({
      variant: {
        currentValue: ButtonFieldVariantEnum.Secondary,
        previousValue: ButtonFieldVariantEnum.Primary,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classVariant).toBe('variant-secondary');
  });

  it('should update classSize on size change', () => {
    component.size = ButtonFieldSizeEnum.Small;
    component.ngOnChanges({
      size: {
        currentValue: ButtonFieldSizeEnum.Small,
        previousValue: ButtonFieldSizeEnum.Medium,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classSize).toBe('size-small');
  });

  it('should update classColor on color change', () => {
    component.color = ButtonFieldColorEnum.LigthPurple;
    component.ngOnChanges({
      color: {
        currentValue: ButtonFieldColorEnum.LigthPurple,
        previousValue: ButtonFieldColorEnum.DarkPurple,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classColor).toBe('color-ligth-purple');
  });

  it('should update classIcon on icon change', () => {
    component.icon = ButtonFieldIconEnum.Left;
    component.ngOnChanges({
      icon: {
        currentValue: ButtonFieldIconEnum.Left,
        previousValue: ButtonFieldIconEnum.None,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classIcon).toBe('icon-left');
  });

  it('should initialize class properties on init', () => {
    component.ngOnInit();
    expect(component.classVariant).toBe('variant-primary');
    expect(component.classSize).toBe('size-medium');
    expect(component.classColor).toBe('color-dark-purple');
    expect(component.classIcon).toBe('icon-none');
  });
});
