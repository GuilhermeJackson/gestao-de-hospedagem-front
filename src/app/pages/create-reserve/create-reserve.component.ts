import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../shared/model/guest.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ReserveService } from '../shared/service/reservation.service';
import { GuestService } from '../shared/service/guest.service';

@Component({
  selector: 'app-create-reserve',
  templateUrl: './create-reserve.component.html',
  styleUrls: ['./create-reserve.component.less']
})
export class CreateReserveComponent implements OnInit {
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  reserveFormGroup: FormGroup;
  myControl = new FormControl();
  options: Guest[] = [
    { id: 1, name: 'Nome do hospede', phone: '47 991056721', cpf: '000.000.000-21' },
    { id: 2, name: 'Pedrinho', phone: '47 991056721', cpf: '000.000.000-21' }

  ];
  filteredOptions!: Observable<Guest[]>;

  constructor(
    private formBuilder: FormBuilder,
    private reserveService: ReserveService,
    private guestService: GuestService
  ) {
    this.reserveFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      isGarage: [null, Validators.required],
    });

    this.guestService
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)) // Corrigindo o mapeamento
    );
  }

  displayFn(guest: Guest): string {
    return guest && guest.name ? guest.name : '';
  }

  private _filter(value: string | Guest): Guest[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
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
