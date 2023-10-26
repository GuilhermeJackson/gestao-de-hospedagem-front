import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGustComponent } from './create-gust.component';

describe('CreateGustComponent', () => {
  let component: CreateGustComponent;
  let fixture: ComponentFixture<CreateGustComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGustComponent]
    });
    fixture = TestBed.createComponent(CreateGustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
