import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrdersDetailsComponent } from './seller-orders-details.component';

describe('SellerOrdersDetailsComponent', () => {
  let component: SellerOrdersDetailsComponent;
  let fixture: ComponentFixture<SellerOrdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerOrdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
