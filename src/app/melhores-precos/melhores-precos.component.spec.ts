import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelhoresPrecosComponent } from './melhores-precos.component';

describe('MelhoresPrecosComponent', () => {
  let component: MelhoresPrecosComponent;
  let fixture: ComponentFixture<MelhoresPrecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MelhoresPrecosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MelhoresPrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
