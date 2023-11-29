import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReserveService } from '../shared/service/reservation.service';
import { of } from 'rxjs';
import { Guest } from '../shared/model/guest.model';
import { GuestWithReserve } from '../shared/model/guest-with-reserve.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let reserveService: ReserveService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientModule,
        MatListModule
      ],
      providers: [
        ReserveService
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    reserveService = TestBed.inject(ReserveService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of reserve without checkin', () => {
    const listGuestWithoutCheckout = [guestWithoutCheckoutData, guestWithoutCheckoutData];
    spyOn(reserveService, 'getReserveWithoutCheckout').and.returnValue(of(listGuestWithoutCheckout));
    const listGuestWithoutCheckin = [guestWithoutCheckinData, guestWithoutCheckinData];
    spyOn(reserveService, 'getReserveWithoutCheckin').and.returnValue(of(listGuestWithoutCheckin));

    component.ngOnInit();

    expect(component.guests).toContain(guestWithoutCheckinData);
  });

  it('should get list of reserve without checkout', () => {
    const listGuestWithoutCheckout = [guestWithoutCheckoutData, guestWithoutCheckoutData];
    spyOn(reserveService, 'getReserveWithoutCheckout').and.returnValue(of(listGuestWithoutCheckout));
    const listGuestWithoutCheckin = [guestWithoutCheckinData, guestWithoutCheckinData];
    spyOn(reserveService, 'getReserveWithoutCheckin').and.returnValue(of(listGuestWithoutCheckin));

    component.ngOnInit();

    expect(component.guests).toContain(guestWithoutCheckoutData);
  });

  it('should show guests in hotel', () => {
    const guestsInHotel: GuestWithReserve[] = [guestWithoutCheckoutData, guestWithoutCheckoutData];

    component.guestsInHotel = guestsInHotel;
    component.showGuestsInHotel();

    expect(component.guests).toEqual(guestsInHotel);
    expect(component.guests).toContain(guestWithoutCheckoutData);
    expect(component.guests[0]).toBe(guestWithoutCheckoutData);
    expect(component.guests).toBeTruthy();
  });

  it('should show guests out hotel', () => {
    const guestsInHotel: GuestWithReserve[] = [guestWithReserveFake];

    component.guestsOutHotel = guestsInHotel;
    component.showGuestsOutHotel();

    expect(component.guests).toEqual(guestsInHotel);
    expect(component.guests).toContain(guestWithReserveFake);
    expect(component.guests[0]).toBe(guestWithReserveFake);
    expect(component.guests).toBeTruthy();
  });

  it('should show guests out hotel and in hotel', () => {
    const guestsInHotel = [guestWithoutCheckoutData];
    const guestsOutHotel = [guestWithoutCheckinData];
    component.guestsInHotel = guestsInHotel;
    component.guestsOutHotel = guestsOutHotel;

    component.showAllGuests();

    expect(component.guests).toEqual([...guestsInHotel, ...guestsOutHotel]);
  });

  const guestFake: Guest = {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    cpf: '12345678901',
  };

  const guestWithReserveFake: GuestWithReserve = {
    checkin: new Date('2023-11-01'),
    checkout: new Date('2023-11-10'),
    guest: guestFake,
    prevCheckin: new Date('2023-10-01'),
    prevCheckout: new Date('2023-10-10'),
    id: 0,
    garage: false
  };

  const guestWithoutCheckinData: GuestWithReserve = {
    checkin: new Date(''),
    checkout: new Date(''),
    guest: guestFake,
    prevCheckin: new Date('2023-10-01'),
    prevCheckout: new Date('2023-10-10'),
    id: 0,
    garage: false
  };

  const guestWithoutCheckoutData: GuestWithReserve = {
    checkin: new Date('2023-11-01'),
    checkout: new Date('2023-11-10'),
    guest: guestFake,
    prevCheckin: new Date('2023-10-01'),
    prevCheckout: new Date('2023-10-10'),
    id: 0,
    garage: false
  };
});
