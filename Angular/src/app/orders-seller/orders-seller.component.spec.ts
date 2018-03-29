import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSellerComponent } from './orders-seller.component';

describe('OrdersSellerComponent', () => {
  let component: OrdersSellerComponent;
  let fixture: ComponentFixture<OrdersSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
