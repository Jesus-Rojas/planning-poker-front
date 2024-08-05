import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from '@core/services/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    const loaderServiceMock = {
      isLoading$: {
        subscribe: jest.fn()
      }
    };

    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [
        { provide: LoaderService, useValue: loaderServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject LoaderService', () => {
    expect(component.loaderService).toBe(loaderService);
  });
});
