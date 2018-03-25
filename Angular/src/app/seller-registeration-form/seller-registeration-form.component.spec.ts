import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRegisterationFormComponent } from './seller-registeration-form.component';

describe('SellerRegisterationFormComponent', () => {
  let component: SellerRegisterationFormComponent;
  let fixture: ComponentFixture<SellerRegisterationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerRegisterationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRegisterationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
