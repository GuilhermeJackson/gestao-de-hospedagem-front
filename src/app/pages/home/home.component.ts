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
  guests: GuestWithReserve[] = []
  guestsInHotel!: GuestWithReserve[];
  guestsOutHotel!: GuestWithReserve[];


  constructor(
    private reserveService: ReserveService
  ) { }

  ngOnInit() {
    this.getReserveWithoutCheckin()
    this.getReserveWithoutCheckout()
    this.showAllGuests();
  }

  getReserveWithoutCheckin() {
    this.reserveService.getReserveWithoutCheckin().subscribe({
      next: (response) => {
        this.guestsOutHotel = response;
      }
    })
  }

  getReserveWithoutCheckout() {
    this.reserveService.getReserveWithoutCheckout().subscribe({
      next: (response) => {
        this.guestsInHotel = response;
      }
    })
  }

  showGuestsInHotel() {
    this.guests = this.guestsInHotel;
  }

  showGuestsOutHotel() {
    this.guests = this.guestsOutHotel;
  }

  showAllGuests() {
    this.guests = [];
    this.guests = [...this.guestsInHotel, ...this.guestsOutHotel];
  }
}
