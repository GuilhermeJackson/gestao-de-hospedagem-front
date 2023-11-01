import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGustComponent } from './create-gust.component';
import { GuestService } from '../shared/service/guest.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Guest } from '../shared/model/guest.model';


describe('CreateGustComponent', () => {
  let component: CreateGustComponent;
  let fixture: ComponentFixture<CreateGustComponent>;
  let guestService: GuestService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGustComponent],
      providers: [
        GuestService,
        FormBuilder,
        Router
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule
      ],
    });
    fixture = TestBed.createComponent(CreateGustComponent);
    component = fixture.componentInstance;
    guestService = TestBed.inject(GuestService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new guest', () => {
    component.guestForm.setValue({
      name: guestData.name,
      phone: guestData.phone,
      cpf: guestData.cpf,
    })
    spyOn(guestService, 'createGuest').and.returnValue(of(guestData));
    const routerSpy = spyOn(router, 'navigate');

    component.addGuest();

    expect(guestService.createGuest).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

  const guestData: Guest = {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    cpf: '12345678901',
  };
});
