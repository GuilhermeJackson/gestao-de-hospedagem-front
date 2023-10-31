import { Component } from '@angular/core';
import { GuestService } from '../shared/service/guest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../shared/model/guest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-gust',
  templateUrl: './create-gust.component.html',
  styleUrls: ['./create-gust.component.less']
})
export class CreateGustComponent {
  guestForm: FormGroup;

  constructor(
    private router: Router,
    protected guestService: GuestService,
    private formBuilder: FormBuilder
  ) {
    this.guestForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
    });
  }

  addGuest(): void {
    if (this.guestForm.valid) {
      const userData = this.guestForm.value;
      const guest: Guest = userData;
      this.guestService.createGuest(guest).subscribe({
        next: (response) => {
          console.log("SUCESSO: " + response)
          this.back()
        },
        error: (error: any) => {
          console.log("ERROR: " + error.toString)
        },
      });
    }
  }

  back(): void {
    this.router.navigate(['/home'])
  }
}
