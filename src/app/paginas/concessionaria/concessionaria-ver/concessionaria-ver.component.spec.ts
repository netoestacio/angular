import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionariaVerComponent } from './concessionaria-ver.component';

describe('ConcessionariaVerComponent', () => {
  let component: ConcessionariaVerComponent;
  let fixture: ComponentFixture<ConcessionariaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessionariaVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessionariaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
