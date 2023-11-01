import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReserveComponent } from './create-reserve.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Guest } from '../shared/model/guest.model';
import { GuestService } from '../shared/service/guest.service';
import { of } from 'rxjs';
import { ReserveService } from '../shared/service/reservation.service';
import { Router } from '@angular/router';

describe('CreateReserveComponent', () => {
  let component: CreateReserveComponent;
  let fixture: ComponentFixture<CreateReserveComponent>;
  let guestService: GuestService;
  let reserveService: ReserveService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReserveComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [
        GuestService,
        ReserveService,
        Router
      ]
    });
    fixture = TestBed.createComponent(CreateReserveComponent);
    component = fixture.componentInstance;
    guestService = TestBed.inject(GuestService);
    reserveService = TestBed.inject(ReserveService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list guests', () => {
    const guests: Guest[] = [guestData, guestData];
    spyOn(guestService, 'getListGuest').and.returnValue(of(guests));
    
    component.ngOnInit();

    expect(component.guests).toEqual(guests);
    expect(component.guests.length).toEqual(2);
    expect(component.guests).toContain(guestData);
  });

  const guestData: Guest = {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    cpf: '12345678901',
  };

  it('should validated form', () => {
    component.formGroup.setValue({
      start: mockReserve.prevCheckin,
      end: mockReserve.prevCheckout,
      isGarage: mockReserve.isGarage,
    });
    component.myControl.setValue(mockReserve.id_guest)

    component.validateForms();

    expect(component.reserve).toEqual({
      id_guest: mockReserve.id_guest,
      prevCheckin: component.formGroup.value.start,
      prevCheckout: component.formGroup.value.end,
      isGarage: component.formGroup.value.isGarage
    });
    expect(component.reserve.id_guest).toEqual(mockReserve.id_guest);
  });

  it('should handle a successful reservation', () => {
    spyOn(reserveService, 'createReserve').and.returnValue(of(mockReserve));
    const routerSpy = spyOn(router, 'navigate');
    component.addReserverValidated();

    expect(reserveService.createReserve).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should function addReserve have been called a successful', () => {
    spyOn(component, 'validateForms');
    spyOn(component, 'addReserverValidated');

    component.addReserve();

    expect(component.validateForms).toHaveBeenCalled();
    expect(component.addReserverValidated).toHaveBeenCalled();
  });

  it('should navigate page', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.back();
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  })

  const mockReserve = {
    checkin: new Date('2023-11-01'),
    checkout: new Date('2023-11-10'),
    prevCheckin: new Date('2023-10-01'),
    prevCheckout: new Date('2023-10-10'),
    id_guest: 1,
    isGarage: true,
  };
});
