import { Component, OnInit } from '@angular/core';
import { ReserveService } from '../shared/service/reservation.service';
import { GuestWithReserve } from '../shared/model/guest-with-reserve.model';
import { Router } from '@angular/router';
import { SnackBarService } from '../shared/service/snack-bar.service';

@Component({
  selector: 'app-attendant-checkin',
  templateUrl: './attendant-checkin.component.html',
  styleUrls: ['./attendant-checkin.component.less']
})
export class AttendantCheckinComponent implements OnInit {
  listReserveWithoutCheckin: GuestWithReserve[] = [];
  errorResponseMessage: string = '';
  constructor(
    private snackBar: SnackBarService,
    private reserveService: ReserveService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getListGuest();
  }

  getListGuest() {
    this.reserveService.getReserveWithoutCheckin()
      .subscribe({
        next: (response) => {
          let auxListReserveWithoutCheckin: GuestWithReserve[] = [];
          response.map((item) => {
            if (item.checkin == null) {
              auxListReserveWithoutCheckin.push(item);
            }
          })
          this.listReserveWithoutCheckin = auxListReserveWithoutCheckin;
        },
        error: (error) => {
          console.log("Erro: ", error)
          this.snackBar.showMessageErro(error.error)
          this.errorResponseMessage = error.error
        }
      })
  }

  checkinNow(id: number) {
    this.listReserveWithoutCheckin.map((item) => {
      if (id === item.id) {
        this.reserveService.saveCheckinGuest({ id: item.id })
          .subscribe({
            next: (response) => {
              console.log(response);
              this.getListGuest();
            },
            error: (error) => {
              console.log("Erro: ", error)
              this.snackBar.showMessageErro(error.error)
              this.errorResponseMessage = error.error;
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
