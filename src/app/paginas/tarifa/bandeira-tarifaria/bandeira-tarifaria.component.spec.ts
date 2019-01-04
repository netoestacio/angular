import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeiraTarifariaComponent } from './bandeira-tarifaria.component';

describe('BandeiraTarifariaComponent', () => {
  let component: BandeiraTarifariaComponent;
  let fixture: ComponentFixture<BandeiraTarifariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandeiraTarifariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeiraTarifariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
