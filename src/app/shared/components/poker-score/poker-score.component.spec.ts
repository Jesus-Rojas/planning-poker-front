import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokerScoreComponent } from './poker-score.component';
import { PokerTableService } from '@shared/services/poker-table.service';
import { SharedModule } from '@shared/shared.module';
import { FeatherModule } from 'angular-feather';
import { getFeatherIcons } from '@shared/utils';

describe('PokerScoreComponent', () => {
  let component: PokerScoreComponent;
  let fixture: ComponentFixture<PokerScoreComponent>;
  let pokerTableService: PokerTableService;

  beforeEach(async () => {
    const pokerTableServiceMock = { };

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FeatherModule.pick(getFeatherIcons(
          ['AlertTriangle', 'Check', 'X', 'Info']
        )),
      ],
      declarations: [PokerScoreComponent],
      providers: [
        { provide: PokerTableService, useValue: pokerTableServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerScoreComponent);
    component = fixture.componentInstance;
    pokerTableService = TestBed.inject(PokerTableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject PokerTableService', () => {
    expect(component.pokerTableService).toBe(pokerTableService);
  });

  it('should have PokerCardSizeEnum defined', () => {
    expect(component.PokerCardSizeEnum).toBeDefined();
  });
});
