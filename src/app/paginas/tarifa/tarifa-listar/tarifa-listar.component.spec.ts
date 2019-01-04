import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaListarComponent } from './tarifa-listar.component';

describe('TarifaListarComponent', () => {
  let component: TarifaListarComponent;
  let fixture: ComponentFixture<TarifaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
