import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsListarComponent } from './icms-listar.component';

describe('IcmsListarComponent', () => {
  let component: IcmsListarComponent;
  let fixture: ComponentFixture<IcmsListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcmsListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcmsListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
