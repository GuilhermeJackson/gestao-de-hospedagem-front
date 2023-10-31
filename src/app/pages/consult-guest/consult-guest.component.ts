import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../shared/model/guest.model';
import { Observable } from 'rxjs';
import { GuestService } from '../shared/service/guest.service';
import { Router } from '@angular/router';
import { ReserveService } from '../shared/service/reservation.service';

@Component({
  selector: 'app-consult-guest',
  templateUrl: './consult-guest.component.html',
  styleUrls: ['./consult-guest.component.less']
})
export class ConsultGuestComponent {
  name: string = ''
  cpf: string = ''
  phone: string = ''
  guests: Guest[] = [];
  filteredOptions!: Observable<Guest[]>;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private guestService: GuestService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.nullValidator],
      phone: ['', Validators.nullValidator],
      cpf: ['', Validators.nullValidator]
    });
  }

  getReserveOfGuests() {
    let name = this.formGroup.value.name;
    let cpf = this.formGroup.value.cpf;
    let phone = this.formGroup.value.phone;
    this.guestService.searchGuest(name, phone, cpf).subscribe({
      next: (response) => {
        this.guests = response;
      }
    })
  }

  isVisible(): boolean {
    if (this.guests.length === 0) {
      return false
    }
    return true;
  }

  back() {
    this.router.navigate(['/home'])
  }
}
