import { Component } from '@angular/core';
import { GuestWithReserve } from '../shared/model/guest-with-reserve.model';
import { ReserveService } from '../shared/service/reservation.service';
import { Router } from '@angular/router';
import { Payment } from '../shared/model/payment.model';
import * as moment from 'moment';
import { PaymentCalculate } from '../shared/model/payment-calculate.model';
import { WeekendaysAndWeekday } from '../shared/model/weekndays-weeday.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendant-checkout',
  templateUrl: './attendant-checkout.component.html',
  styleUrls: ['./attendant-checkout.component.less']
})
export class AttendantCheckoutComponent {
  guests: GuestWithReserve[] = [];
  payment!: Payment;
  errorResponseMessage = "";
  constructor(
    private snackBar: MatSnackBar,
    private reserveService: ReserveService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getListGuest();
    this.payment = {}
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, "Fechar", {
      verticalPosition: "top",
      horizontalPosition: "start",
    })
  }

  getListGuest() {
    this.guests = []
    this.reserveService.getReserveWithoutCheckout().subscribe({
      next: (response) => {
        let auxListReserveWithoutCheckout: GuestWithReserve[] = []
        response.map((item) => {
          if (item.checkin !== null && item.checkout == null) {
            auxListReserveWithoutCheckout.push(item);
          }
        }),
        this.guests = auxListReserveWithoutCheckout
      },
      error: (error) => {
        this.errorResponseMessage = error.error;
        this.openSnackBar(error.error)
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
          },
          error: (error) => {
            this.errorResponseMessage = error.error;
            this.openSnackBar(error.error)
          }
        })
      }
    })
    this.getListGuest();
    this.payment = {};
  }

  selectedGuest(id: number) {
    const guest = this.guests.find((item) => item.id === id)

    if (!guest) {
      console.log("Nao tem hospede")
      return
    }
    if (!guest.checkin) {
      console.log("Nao tem checkin do hospede")
      return
    }
    const numberOfWeekdaysAndWeekends: WeekendaysAndWeekday = this.getDaysOfWeekdayAndWeekends(guest.checkin);
    const valueCalculate = this.calculateValues(numberOfWeekdaysAndWeekends, guest.garage);
    this.setPaymentValues(valueCalculate, numberOfWeekdaysAndWeekends);
    this.payment.idReserve = guest.id
  }

  setPaymentValues(paymentCalculate: PaymentCalculate, weekendaysAndWeekday: WeekendaysAndWeekday) {
    this.payment.valueWeekday = paymentCalculate.valueWeekday;
    this.payment.valueWeekendays = paymentCalculate.valueWeekendays;
    this.payment.valueGarageWeekday = paymentCalculate.valueGarageWeekday;
    this.payment.valueGarageWeekendays = paymentCalculate.valueGarageWeekendays;
    this.payment.qtWeekday = weekendaysAndWeekday.weekday;
    this.payment.qtWeekendays = weekendaysAndWeekday.weekendays;
    this.payment.totalValue = paymentCalculate.totalValue;
  }

  calculateValues(numberOfWeekdaysAndWeekends: WeekendaysAndWeekday, hasGarage: boolean): PaymentCalculate {
    const weekday = numberOfWeekdaysAndWeekends.weekday;
    const weekendays = numberOfWeekdaysAndWeekends.weekendays;

    const valueWeekday = weekday * 120;
    const valueWeekendays = weekendays * 180;
    const valueGarageWeekday = hasGarage ? weekday * 20 : 0;
    const valueGarageWeekendays = hasGarage ? weekendays * 15 : 0;
    const total = valueWeekday + valueWeekendays + valueGarageWeekday + valueGarageWeekendays;

    const paymnetCalculate: PaymentCalculate = {
      valueWeekday: valueWeekday,
      valueWeekendays: valueWeekendays,
      valueGarageWeekday: valueGarageWeekday,
      valueGarageWeekendays: valueGarageWeekendays,
      totalValue: total
    }
    return paymnetCalculate;
  }

  getDaysOfWeekdayAndWeekends(guestCheckinDate: Date): WeekendaysAndWeekday {
    const checkinDate = moment(guestCheckinDate, 'YYYY-MM-DDTHH:mm:ss');
    const checkinDateConvert = checkinDate.toDate();
    const currentDate = new Date();
    let weekendays = 0;
    let weekday = 0;
    while (checkinDateConvert < currentDate) {
      checkinDateConvert.setDate(checkinDateConvert.getDate() + 1);
      const dayOfTheWeek = checkinDateConvert.getDay();
      if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
        weekendays++;
      } else {
        weekday++;
      }
    }
    const dateWeek: WeekendaysAndWeekday = {
      weekendays,
      weekday
    }
    return dateWeek;
  }

  back() {
    this.router.navigate(['/'])
  }

  navigateCheckout() {
    this.router.navigate(['/checkout'])
  }
}
