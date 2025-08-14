import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBddDonnees } from './mes-bdd-donnees';

describe('MesBddDonnees', () => {
  let component: MesBddDonnees;
  let fixture: ComponentFixture<MesBddDonnees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesBddDonnees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBddDonnees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
