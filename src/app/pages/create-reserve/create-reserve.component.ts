import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../shared/model/guest.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ReserveService } from '../shared/service/reservation.service';
import { GuestService } from '../shared/service/guest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserve } from '../shared/model/reserve.model';
import { SnackBarService } from '../shared/service/snack-bar.service';

@Component({
  selector: 'app-create-reserve',
  templateUrl: './create-reserve.component.html',
  styleUrls: ['./create-reserve.component.less']
})
export class CreateReserveComponent implements OnInit {
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  reserve!: Reserve;
  myControl = new FormControl();
  guests: Guest[] = [];
  filteredOptions!: Observable<Guest[]>;
  formGroup!: FormGroup;

  constructor(
    private snackbar: SnackBarService,
    private formBuilder: FormBuilder,
    private guestService: GuestService,
    private reserveService: ReserveService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getGuests();
    this.initFormGroup();
    this.filterAutocomplete();
  }

  getGuests() {
    this.guestService.getListGuest()
      .subscribe({
        next: (response) => {
          response.map((item) => {
            this.guests.push(item)
          })
          console.log("SUCESSO: " + response.map((guest) => guest))
        },
        error: (error: any) => {
          console.log("ERROR: " + error)
        },
      });
  }

  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      isGarage: ['', Validators.required]
    });
  }

  filterAutocomplete() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  addReserve() {
    this.validateForms();
    this.addReserverValidated();
  }

  addReserverValidated() {
    this.reserveService.createReserve(this.reserve).subscribe({
      next: () => {
        this.snackbar.showMessageSuccess("Reserva criada com sucesso!")
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        this.snackbar.showMessageErro(error.error)
        console.log("ERROR: " + error)
      },
    })
  }

  validateForms() {
    if (this.formGroup.valid && this.myControl.valid) {
      const reserve = this.formGroup.value;
      const controleName = this.myControl.value;
      this.reserve = {
        id_guest: controleName,
        prevCheckin: reserve.start,
        prevCheckout: reserve.end,
        garage: reserve.isGarage
      }
    }
  }

  private _filter(value: string) {
    const filterValue = value;
    return this.guests.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  back() {
    this.router.navigate(['/home']);
  }

  campaignOne = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 13)),
    end: new FormControl(new Date(this.year, this.month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 15)),
    end: new FormControl(new Date(this.year, this.month, 19)),
  });
}
