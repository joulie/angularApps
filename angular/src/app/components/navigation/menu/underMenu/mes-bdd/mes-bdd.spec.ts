import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MesBdd } from './mes-bdd';

describe('MesBdd', () => {
  let component: MesBdd;
  let fixture: ComponentFixture<MesBdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MesBdd, // ou MenuComponent selon le fichier
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
