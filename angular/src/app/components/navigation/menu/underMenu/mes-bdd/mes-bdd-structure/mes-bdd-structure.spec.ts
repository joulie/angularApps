import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MesBddStructure } from './mes-bdd-structure';

describe('MesBddStructure', () => {
  let component: MesBddStructure;
  let fixture: ComponentFixture<MesBddStructure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MesBddStructure,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBddStructure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
