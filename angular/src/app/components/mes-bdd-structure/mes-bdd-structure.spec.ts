import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBddStructure } from './mes-bdd-structure';

describe('MesBddStructure', () => {
  let component: MesBddStructure;
  let fixture: ComponentFixture<MesBddStructure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesBddStructure]
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
