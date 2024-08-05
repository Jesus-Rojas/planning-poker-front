import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerChipComponent } from './poker-chip.component';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '@design-system/atoms/avatar-field/types';
import { DesignSystemModule } from '@design-system/design-system.module';
import { FeatherModule } from 'angular-feather';
import { getFeatherIcons } from '@shared/utils';

describe('PokerChipComponent', () => {
  let component: PokerChipComponent;
  let fixture: ComponentFixture<PokerChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DesignSystemModule,
        FeatherModule.pick(getFeatherIcons(
          ['AlertTriangle', 'Check', 'X', 'Info']
        )),
      ],
      declarations: [PokerChipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have variant set to AvatarFieldVariantEnum.Icon', () => {
    expect(component.variant).toEqual(AvatarFieldVariantEnum.Icon);
  });

  it('should have size set to AvatarFieldSizeEnum.Large', () => {
    expect(component.size).toEqual(AvatarFieldSizeEnum.Large);
  });
});
