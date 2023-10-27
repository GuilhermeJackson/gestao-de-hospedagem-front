import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../shared/model/guest.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-reserve',
  templateUrl: './create-reserve.component.html',
  styleUrls: ['./create-reserve.component.less']
})
export class CreateReserveComponent implements OnInit {
  reserveFormGroup: FormGroup;
  myControl = new FormControl(); 
  options: Guest[] = [ 
    { id: 1, name: 'Catarina', phone: 'asdas0', cpf:'sadasd' },
    { id: 2, name: 'REMENDO', phone: 'asdas0', cpf:'sadasd' }
    
  ];
  filteredOptions!: Observable<Guest[]>; // Usando um array de objetos Guest

  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.reserveFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      isGarage: [false, Validators.required],
    });
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
}
