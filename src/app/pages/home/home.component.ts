import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../shared/model/guest.model';
import { ReserveService } from '../shared/service/reservation.service';
import { GuestWithReserve } from '../shared/model/guest-with-reserve.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  formGroup!: FormGroup
  guests!: GuestWithReserve[];
  guestsInHotel!: GuestWithReserve[];
  guestsOutHotel!: GuestWithReserve[];


  constructor(
    private reserveService: ReserveService
  ) { }

  ngOnInit() {
    this.reserveService.getReserveWithGuest().subscribe({
      next: (response) => {
        this.guests = response;
        this.filterGuestLists()
      }
    })
  }

  getListFilterGuestOutHotel(guestWithReserve: GuestWithReserve) {
    if (guestWithReserve.checkin !== null && guestWithReserve.checkout == null) {
      this.guestsInHotel.push(guestWithReserve);
    }
  }

  getListFilterGuestInHotel(guestWithReserve: GuestWithReserve) {
    if (guestWithReserve.checkin == null && guestWithReserve.prevCheckin !== null) {
      this.guestsOutHotel.push(guestWithReserve);
    }
  }

  filterGuestLists() {
    this.guestsInHotel = this.guests.filter((guest) => guest.checkin !== null && guest.checkout === null);
    this.guestsOutHotel = this.guests.filter((guest) => guest.checkin === null && guest.prevCheckin !== null);
  }

  showGuestsInHotel() {
    this.guests = this.guestsInHotel;
  }

  showGuestsOutHotel() {
    this.guests = this.guestsOutHotel;
  }

  showAllGuests() {
    this.guests = [...this.guestsInHotel, ...this.guestsOutHotel];
  }
}
