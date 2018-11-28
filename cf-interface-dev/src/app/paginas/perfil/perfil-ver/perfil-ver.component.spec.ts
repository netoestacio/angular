import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVerComponent } from './perfil-ver.component';

describe('PerfilVerComponent', () => {
  let component: PerfilVerComponent;
  let fixture: ComponentFixture<PerfilVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
