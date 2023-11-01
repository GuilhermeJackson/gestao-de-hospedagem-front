import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GuestWithReserve } from '../model/guest-with-reserve.model';
import { ReserveService } from './reservation.service';
import { Guest } from '../model/guest.model';
import { Reserve } from '../model/reserve.model';

describe('ReservationService', () => {
  let reservationService: ReserveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReserveService],
    });
    reservationService = TestBed.inject(ReserveService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should list reservations', () => {
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
    const mockReservations: GuestWithReserve[] = [guestWithReserveData, guestWithReserveData];

    reservationService.getReserveWithGuest().subscribe(
      (reservations: GuestWithReserve[]) => {
        expect(reservations).toEqual(mockReservations);
      });

    const req = httpMock.expectOne('http://localhost:8080/api/reserva');

    expect(req.request.method).toBe('GET');

    req.flush(mockReservations);
  });

  it('should creat new reserve', () => {
    const reserveObject: Reserve = {
      checkin: new Date('2023-11-01'),
      checkout: new Date('2023-11-10'),
      prevCheckin: new Date('2023-10-01'),
      prevCheckout: new Date('2023-10-10'),
      id_guest: 1,
      isGarage: true,
    };
    reservationService.createReserve(reserveObject).subscribe(
      (reservations: Reserve) => {
        expect(reservations).toEqual(reserveObject);
      });
    const req = httpMock.expectOne('http://localhost:8080/api/reserva');

    expect(req.request.method).toBe('POST');

    req.flush(reserveObject);
  });
});
