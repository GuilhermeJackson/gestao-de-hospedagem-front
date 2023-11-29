import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../shared/model/guest.model';
import { ReserveService } from '../shared/service/reservation.service';
import { GuestWithReserve } from '../shared/model/guest-with-reserve.model';
import { forkJoin } from 'rxjs';

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
    forkJoin([
      this.reserveService.getReserveWithoutCheckin(),
      this.reserveService.getReserveWithoutCheckout()
    ]).subscribe({
      next: ([guestsWithoutCheckin, guestsWithoutCheckout]) => {
        this.guestsOutHotel = guestsWithoutCheckin;
        this.guestsInHotel = guestsWithoutCheckout;
        this.showAllGuests();
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });
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
