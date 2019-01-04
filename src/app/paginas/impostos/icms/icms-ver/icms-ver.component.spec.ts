import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsVerComponent } from './icms-ver.component';

describe('IcmsVerComponent', () => {
  let component: IcmsVerComponent;
  let fixture: ComponentFixture<IcmsVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcmsVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcmsVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
