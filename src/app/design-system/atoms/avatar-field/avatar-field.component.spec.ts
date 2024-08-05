import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFieldComponent } from './avatar-field.component';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from './types';

describe('AvatarFieldComponent', () => {
  let component: AvatarFieldComponent;
  let fixture: ComponentFixture<AvatarFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.variant).toBe(AvatarFieldVariantEnum.TextPurple);
    expect(component.size).toBe(AvatarFieldSizeEnum.Small);
    expect(component.icon).toBe('/svgs/clock.svg');
    expect(component.urlImage).toBe('/images/avatar.jpeg');
    expect(component.text).toBe('LU');
  });

  it('should update classVariant on variant change', () => {
    component.variant = AvatarFieldVariantEnum.Icon;
    component.ngOnChanges({
      variant: {
        currentValue: AvatarFieldVariantEnum.Icon,
        previousValue: AvatarFieldVariantEnum.TextPurple,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classVariant).toBe('variant-icon');
  });

  it('should update classSize on size change', () => {
    component.size = AvatarFieldSizeEnum.Large;
    component.ngOnChanges({
      size: {
        currentValue: AvatarFieldSizeEnum.Large,
        previousValue: AvatarFieldSizeEnum.Small,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classSize).toBe('size-large');
  });

  it('should update backgroundImageIcon on icon change', () => {
    component.icon = '/svgs/new-icon.svg';
    component.ngOnChanges({
      icon: {
        currentValue: '/svgs/new-icon.svg',
        previousValue: '/svgs/clock.svg',
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.backgroundImageIcon).toBe('url(/svgs/new-icon.svg)');
  });

  it('should update backgroundImageAvatar on urlImage change', () => {
    component.variant = AvatarFieldVariantEnum.Image;
    component.urlImage = '/images/new-avatar.jpeg';
    component.ngOnChanges({
      urlImage: {
        currentValue: '/images/new-avatar.jpeg',
        previousValue: '/images/avatar.jpeg',
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.backgroundImageAvatar).toBe(
      'url(/images/new-avatar.jpeg)'
    );
  });

  it('should update backgroundImageAvatar on variant change', () => {
    component.variant = AvatarFieldVariantEnum.Image;
    component.ngOnChanges({
      variant: {
        currentValue: AvatarFieldVariantEnum.Image,
        previousValue: AvatarFieldVariantEnum.TextPurple,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.backgroundImageAvatar).toBe('url(/images/avatar.jpeg)');
  });
});
