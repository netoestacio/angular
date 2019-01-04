import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteVerComponent } from './cliente-ver.component';

describe('ClienteVerComponent', () => {
  let component: ClienteVerComponent;
  let fixture: ComponentFixture<ClienteVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
