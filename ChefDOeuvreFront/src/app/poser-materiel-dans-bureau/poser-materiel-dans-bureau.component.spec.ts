import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoserMaterielDansBureauComponent } from './poser-materiel-dans-bureau.component';

describe('PoserMaterielDansBureauComponent', () => {
  let component: PoserMaterielDansBureauComponent;
  let fixture: ComponentFixture<PoserMaterielDansBureauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoserMaterielDansBureauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoserMaterielDansBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
