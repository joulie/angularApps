import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Assignments } from './assignments';
import { Produit } from '../../services/produit';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('Assignments', () => {
  let component: Assignments;
  let fixture: ComponentFixture<Assignments>;
  let produitServiceSpy: jasmine.SpyObj<Produit>;

  beforeEach(async () => {
    const produitSpy = jasmine.createSpyObj('Produit', [
      'getAssignments',
      'ajouterProduit',
      'modifierProduit',
      'supprimerProduit'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule,
        Assignments
      ],
      providers: [{ provide: Produit, useValue: produitSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(Assignments);
    component = fixture.componentInstance;
    produitServiceSpy = TestBed.inject(Produit) as jasmine.SpyObj<Produit>;

    produitServiceSpy.getAssignments.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add assignment if nom is empty', () => {
    component.nom = '';
    component.ajouterAssignement();
    expect(component.messageErreur).toBe('Le nom est obligatoire.');
  });

  it('should call ajouterProduit when adding a valid assignment', () => {
    produitServiceSpy.ajouterProduit.and.returnValue(of({}));
    produitServiceSpy.getAssignments.and.returnValue(of([]));
    component.nom = 'Test';
    component.selectedProductName = 'Samsung';
    component.selectedCode = 'S10';
    component.ajouterAssignement();
    expect(produitServiceSpy.ajouterProduit).toHaveBeenCalled();
  });

  it('should call modifierProduit when editing an assignment', () => {
    produitServiceSpy.modifierProduit.and.returnValue(of({}));
    produitServiceSpy.getAssignments.and.returnValue(of([]));
    component.nom = 'Test';
    component.selectedProductName = 'Samsung';
    component.selectedCode = 'S10';
    component.assignementEnEdition = { id: 1 };
    component.ajouterAssignement();
    expect(produitServiceSpy.modifierProduit).toHaveBeenCalled();
  });

  it('should call supprimerProduit and remove assignment', () => {
    produitServiceSpy.supprimerProduit.and.returnValue(of({}));
    component.assignments = [{ id: 1, nom: 'A' }, { id: 2, nom: 'B' }];
    component.supprimerAssignement(1);
    expect(component.assignments.length).toBe(1);
    expect(component.assignments[0].id).toBe(2);
  });

  it('should filter assignments with filteredAssignments getter', () => {
    component.assignments = [
      { nom: 'Alpha', prenom: 'A', site: 'Paris' },
      { nom: 'Beta', prenom: 'B', site: 'Lyon' }
    ];
    component.searchText = 'lyon';
    const filtered = component.filteredAssignments;
    expect(filtered.length).toBe(1);
    expect(filtered[0].site).toBe('Lyon');
  });

  it('should return all assignments if searchText is empty', () => {
    component.assignments = [
      { nom: 'Alpha', prenom: 'A', site: 'Paris' },
      { nom: 'Beta', prenom: 'B', site: 'Lyon' }
    ];
    component.searchText = '';
    const filtered = component.filteredAssignments;
    expect(filtered.length).toBe(2);
  });

  it('should return codes for selected product', () => {
    component.products = [
      { productName: 'Samsung', code: 'S10' },
      { productName: 'Samsung', code: 'S21' },
      { productName: 'Apple', code: 'iPhone' }
    ];
    component.selectedProductName = 'Samsung';
    const codes = component.codesForSelectedProduct;
    expect(codes).toEqual(['S10', 'S21']);
  });

  it('should return unique product names', () => {
    component.products = [
      { productName: 'Samsung', code: 'S10' },
      { productName: 'Samsung ', code: 'S21' },
      { productName: 'Apple', code: 'iPhone' }
    ];
    const names = component.uniqueProductNames;
    expect(names).toContain('Samsung');
    expect(names).toContain('Apple');
    expect(names.length).toBe(2);
  });
});
