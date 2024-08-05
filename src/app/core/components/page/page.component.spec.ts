import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '@shared/shared.module';
import { FeatherModule } from 'angular-feather';
import { getFeatherIcons } from '@shared/utils';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DesignSystemModule } from '@design-system/design-system.module';
import { LoaderComponent } from '../loader/loader.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FeatherModule.pick(getFeatherIcons(
          ['AlertTriangle', 'Check', 'X', 'Info']
        )),
        DesignSystemModule,
        RouterModule,
      ],
      declarations: [
        PageComponent,
        HeaderComponent,
        LoaderComponent,
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
