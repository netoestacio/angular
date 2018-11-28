import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionariaComponent } from './concessionaria.component';

describe('ConcessionariaComponent', () => {
  let component: ConcessionariaComponent;
  let fixture: ComponentFixture<ConcessionariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessionariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessionariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
