import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PisVerComponent } from './pis-ver.component';

describe('PisVerComponent', () => {
  let component: PisVerComponent;
  let fixture: ComponentFixture<PisVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PisVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
