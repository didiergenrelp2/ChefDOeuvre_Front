import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerMaterielDuBureauComponent } from './lister-materiel-du-bureau.component';

describe('ListerMaterielDuBureauComponent', () => {
  let component: ListerMaterielDuBureauComponent;
  let fixture: ComponentFixture<ListerMaterielDuBureauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerMaterielDuBureauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerMaterielDuBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
