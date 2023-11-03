import { Component, OnInit } from '@angular/core';
import { ReserveService } from '../shared/service/reservation.service';
import { GuestWithReserve } from '../shared/model/guest-with-reserve.model';
import { Router } from '@angular/router';
import { ReserveCheckin } from '../shared/model/reserve-checkin.model';

@Component({
  selector: 'app-attendant-checkin',
  templateUrl: './attendant-checkin.component.html',
  styleUrls: ['./attendant-checkin.component.less']
})
export class AttendantCheckinComponent implements OnInit {
  guests!: GuestWithReserve[]
  constructor(
    private reserveService: ReserveService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getListGuest();
  }

  getListGuest() {
    this.reserveService.getReserveWithoutCheckin().subscribe({
      next: (response) => {
        this.guests = response;
      }
    })
  }

  checkinNow(id: number) {
    this.guests.map((item) => {
      if (id === item.id) {        
        this.reserveService.saveCheckinGuest({id: item.id}).subscribe({
          next: (response) => {
            console.log(response);
          }
        })
      }

    })

    this.getListGuest();
  }

  back() {
    this.router.navigate(['/'])
  }
}
