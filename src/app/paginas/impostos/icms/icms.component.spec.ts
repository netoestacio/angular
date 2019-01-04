import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsComponent } from './icms.component';

describe('IcmsComponent', () => {
  let component: IcmsComponent;
  let fixture: ComponentFixture<IcmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
