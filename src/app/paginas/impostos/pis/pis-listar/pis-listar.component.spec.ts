import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PisListarComponent } from './pis-listar.component';

describe('PisListarComponent', () => {
  let component: PisListarComponent;
  let fixture: ComponentFixture<PisListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PisListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
