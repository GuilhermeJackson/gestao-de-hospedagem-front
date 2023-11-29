import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantCheckoutComponent } from './attendant-checkout.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from '../shared/service/snack-bar.service';
import { ReserveService } from '../shared/service/reservation.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('AttendantCheckoutComponent', () => {
  let component: AttendantCheckoutComponent;
  let fixture: ComponentFixture<AttendantCheckoutComponent>;
  let snackBarService: SnackBarService;
  let reserveService: ReserveService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AttendantCheckoutComponent
      ],
      imports: [
        HttpClientModule,
        MatSnackBarModule
      ],
      providers: [
        SnackBarService,
        ReserveService,
        Router
      ]
    });
    fixture = TestBed.createComponent(AttendantCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    snackBarService = TestBed.inject(SnackBarService);
    reserveService = TestBed.inject(ReserveService);
    router = TestBed.inject(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
