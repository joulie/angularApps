import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MesBddUtilisateurs } from './mes-bdd-utilisateurs';

describe('MesBddUtilisateurs', () => {
  let component: MesBddUtilisateurs;
  let fixture: ComponentFixture<MesBddUtilisateurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MesBddUtilisateurs,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBddUtilisateurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
