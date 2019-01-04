import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PisComponent } from './pis.component';

describe('PisComponent', () => {
  let component: PisComponent;
  let fixture: ComponentFixture<PisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
