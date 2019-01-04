import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloTarifarioComponent } from './modelo-tarifario.component';

describe('ModeloTarifarioComponent', () => {
  let component: ModeloTarifarioComponent;
  let fixture: ComponentFixture<ModeloTarifarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloTarifarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloTarifarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
