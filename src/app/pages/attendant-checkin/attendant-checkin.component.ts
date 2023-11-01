import { Component, OnInit } from '@angular/core';
import { ReserveService } from '../shared/service/reservation.service';
import { Guest } from '../shared/model/guest.model';
import { GuestWithReserve } from '../shared/model/guest-with-reserve.model';
import { Router } from '@angular/router';

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
    this.reserveService.getReserveWithoutCheckin().subscribe({
      next: (response) => {
        this.guests = response;
      }
    })
  }

  checkinNow() {
  }

  back() {
    this.router.navigate(['/'])
  }
}
