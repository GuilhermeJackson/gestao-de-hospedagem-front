import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultGuestComponent } from './consult-guest.component';

describe('ConsultGuestComponent', () => {
  let component: ConsultGuestComponent;
  let fixture: ComponentFixture<ConsultGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultGuestComponent]
    });
    fixture = TestBed.createComponent(ConsultGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
