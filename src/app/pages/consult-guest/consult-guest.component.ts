import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../shared/model/guest.model';
import { Observable } from 'rxjs';
import { GuestService } from '../shared/service/guest.service';
import { GuestFilter } from '../shared/model/guest-filter.model';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.route.queryParams.subscribe(
      queryParam => {
        this.name = queryParam['name'];
        this.cpf = queryParam['cpf'];
        this.phone = queryParam['phone'];
        console.log(queryParam)
      }
    )

    this.initFormGroup();


  }

  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
    });
  }

  getReserveOfGuests() {
    const guest: GuestFilter = this.formGroup.value;
    let name = this.formGroup.value.name;
    let cpf = this.formGroup.value.cpf;
    let phone = this.formGroup.value.phone;
    console.log(name, cpf, phone)
    this.guestService.searchGuest(name, phone, cpf).subscribe({
      next: (response) => {
        this.guests = response;
        console.log(response)
      }
    })
  }
}
