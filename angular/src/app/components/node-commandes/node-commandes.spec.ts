import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NodeCommandes } from './node-commandes';

describe('NodeCommandes', () => {
  let component: NodeCommandes;
  let fixture: ComponentFixture<NodeCommandes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NodeCommandes,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeCommandes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
