import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaVerComponent } from './tarifa-ver.component';

describe('TarifaVerComponent', () => {
  let component: TarifaVerComponent;
  let fixture: ComponentFixture<TarifaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifaVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
