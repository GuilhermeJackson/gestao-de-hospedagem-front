import { Component } from '@angular/core';
import { GuestWithReserve } from '../shared/model/guest-with-reserve.model';
import { ReserveService } from '../shared/service/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendant-checkout',
  templateUrl: './attendant-checkout.component.html',
  styleUrls: ['./attendant-checkout.component.less']
})
export class AttendantCheckoutComponent {
  guests: GuestWithReserve[] = [];
  constructor(
    private reserveService: ReserveService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getListGuest();
  }

  getListGuest() {
    this.reserveService.getReserveWithoutCheckout().subscribe({
      next: (response) => {
        let auxListReserveWithoutCheckout: GuestWithReserve[] = []
        console.log(response)
        response.map((item) => {
          if(item.checkin !== null && item.checkout == null) {
            auxListReserveWithoutCheckout.push(item);
          }
        })
        this.guests = auxListReserveWithoutCheckout
      }
    })
  }

  checkoutNow(id: number) {
    this.guests.map((item) => {
      if (id === item.id) {
        this.reserveService.saveChekoutGuest({ id: item.id }).subscribe({
          next: (response) => {
            console.log(response);
            this.getListGuest();
          }
        })
      }

    })

    this.getListGuest();
  }

  back() {
    this.router.navigate(['/'])
  }

  navigateCheckout() {
    this.router.navigate(['/checkout'])
  }
}
