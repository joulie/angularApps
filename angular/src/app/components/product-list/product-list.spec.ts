import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductList } from './product-list';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductList,
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add product with rating > 5', () => {
    component.newProduct = {
      productName: 'Test',
      code: 'T1',
      available: '2025',
      price: 100,
      rating: 6,
      image: ''
    };
    spyOn(window, 'alert');
    component.addProduct();
    expect(window.alert).toHaveBeenCalledWith('La note doit être comprise entre 0 et 5');
  });

  it('should not add product with rating < 0', () => {
    component.newProduct = {
      productName: 'Test',
      code: 'T1',
      available: '2025',
      price: 100,
      rating: -1,
      image: ''
    };
    spyOn(window, 'alert');
    component.addProduct();
    expect(window.alert).toHaveBeenCalledWith('La note doit être comprise entre 0 et 5');
  });

  it('should not add product without productName', () => {
    component.newProduct = {
      productName: '',
      code: 'T1',
      available: '2025',
      price: 100,
      rating: 4,
      image: ''
    };
    spyOn(window, 'alert');
    component.addProduct();
    expect(window.alert).toHaveBeenCalledWith('Le nom du produit est obligatoire');
  });

  it('should add product with valid data', () => {
    component.newProduct = {
      productName: 'Test',
      code: 'T1',
      available: '2025',
      price: 100,
      rating: 5,
      image: ''
    };
    spyOn(component['http'], 'post').and.returnValue({
      subscribe: (fn: any) => fn({ id: 1 })
    } as any);
    component.addProduct();
    expect(component.products.length).toBeGreaterThan(-1);
    expect(component.products[0].productName).toBe('Test');
  });
});
