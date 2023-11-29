import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantCheckinComponent } from './attendant-checkin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReserveService } from '../shared/service/reservation.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../shared/service/snack-bar.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

describe('AttendantCheckinComponent', () => {
  let component: AttendantCheckinComponent;
  let fixture: ComponentFixture<AttendantCheckinComponent>;
  let reserveService: ReserveService;
  let router: Router;
  let snackBarService: SnackBarService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendantCheckinComponent],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatListModule
      ],
      providers: [
        ReserveService,
        Router,
        SnackBarService,
        MatSnackBar 
      ]
    });
    fixture = TestBed.createComponent(AttendantCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    reserveService = TestBed.inject(ReserveService);
    snackBarService = TestBed.inject(SnackBarService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
