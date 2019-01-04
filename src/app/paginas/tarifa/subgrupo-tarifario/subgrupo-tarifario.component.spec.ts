import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgrupoTarifarioComponent } from './subgrupo-tarifario.component';

describe('SubgrupoTarifarioComponent', () => {
  let component: SubgrupoTarifarioComponent;
  let fixture: ComponentFixture<SubgrupoTarifarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgrupoTarifarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgrupoTarifarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
