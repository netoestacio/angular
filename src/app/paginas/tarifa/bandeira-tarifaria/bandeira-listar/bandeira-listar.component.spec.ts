import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeiraListarComponent } from './bandeira-listar.component';

describe('BandeiraListarComponent', () => {
  let component: BandeiraListarComponent;
  let fixture: ComponentFixture<BandeiraListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandeiraListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeiraListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
