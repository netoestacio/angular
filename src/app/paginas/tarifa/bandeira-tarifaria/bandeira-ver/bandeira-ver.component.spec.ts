import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeiraVerComponent } from './bandeira-ver.component';

describe('BandeiraVerComponent', () => {
  let component: BandeiraVerComponent;
  let fixture: ComponentFixture<BandeiraVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandeiraVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeiraVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
