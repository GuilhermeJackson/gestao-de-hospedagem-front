import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultGuestComponent } from './consult-guest.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GuestService } from '../shared/service/guest.service';
import { Guest } from '../shared/model/guest.model';
import { Router } from '@angular/router';

describe('ConsultGuestComponent', () => {
  let component: ConsultGuestComponent;
  let fixture: ComponentFixture<ConsultGuestComponent>;
  let guestService: GuestService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultGuestComponent],
      imports: [HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule],
      providers: [
        GuestService,
        Router
      ]
    });
    fixture = TestBed.createComponent(ConsultGuestComponent);
    guestService = TestBed.inject(GuestService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get reserve of guests', () => {
    const guestData: Guest[] = [guestFake];
    component.formGroup.setValue({
      name: "Nome",
      cpf: "00000000000",
      phone: "47 999999999"
    });
    spyOn(guestService, 'searchGuest').and.returnValue(of(guestData));

    component.getReserveOfGuests();

    expect(component.guests).toContain(guestFake);
    expect(component.guests[0]).toBe(guestFake);
    expect(component.guests).toBeTruthy();
  });


  it('should navigate on home', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.back();
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

  const guestFake = {
    id: 2,
    name: 'John Doe',
    phone: '123-456-7890',
    cpf: '12345678901',
  }
});
