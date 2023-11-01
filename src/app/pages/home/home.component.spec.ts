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
      imports: [HttpClientModule, MatListModule],
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

  it('should get list of reserve with guest', () => {
    const listGuestWithReserveData = [guestWithReserveData, guestWithReserveData]
    spyOn(reserveService, 'getReserveWithGuest').and.returnValue(of(listGuestWithReserveData))

    component.ngOnInit();

    expect(component.guests).toEqual(listGuestWithReserveData);
  });

  it('should show guests in hotel', () => {
    const guestsInHotel: GuestWithReserve[] = [guestWithReserveData];

    component.guestsInHotel = guestsInHotel;
    component.showGuestsInHotel();

    expect(component.guests).toEqual(guestsInHotel);
    expect(component.guests).toContain(guestWithReserveData);
    expect(component.guests[0]).toBe(guestWithReserveData);
    expect(component.guests).toBeTruthy();
  });

  it('should show guests out hotel', () => {
    const guestsInHotel: GuestWithReserve[] = [guestWithReserveData];

    component.guestsOutHotel = guestsInHotel;
    component.showGuestsOutHotel();

    expect(component.guests).toEqual(guestsInHotel);
    expect(component.guests).toContain(guestWithReserveData);
    expect(component.guests[0]).toBe(guestWithReserveData);
    expect(component.guests).toBeTruthy();
  });

  it('should show guests out hotel and in hotel', () => {
    const guestsInHotel = [guestWithReserveData];
    const guestsOutHotel = [guestWithReserveData];
    component.guestsInHotel = guestsInHotel;
    component.guestsOutHotel = guestsOutHotel;

    component.showAllGuests();

    expect(component.guests).toEqual([...guestsInHotel, ...guestsOutHotel]);
  });

  it('should filter guests in hotel and guests out of hotel', () => {
    const guests: GuestWithReserve[] = [guestWithReserveData];

    component.guests = guests;
    component.filterGuestLists();

    const getFilterInHotel = guests.filter(guest => guest.checkin !== null && guest.checkout === null);
    const getFilteroutHotel = guests.filter(guest => guest.checkin === null && guest.prevCheckin !== null)
    expect(component.guestsInHotel).toEqual(getFilterInHotel);
    expect(component.guestsOutHotel).toEqual(getFilteroutHotel);
  });

  const guestData: Guest = {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    cpf: '12345678901',
  };
  const guestWithReserveData: GuestWithReserve = {
    checkin: new Date('2023-11-01'),
    checkout: new Date('2023-11-10'),
    guest: guestData,
    prevCheckin: new Date('2023-10-01'),
    prevCheckout: new Date('2023-10-10'),
  };
});
