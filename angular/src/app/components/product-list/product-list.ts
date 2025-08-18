import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, NgIf, NgClass, FormsModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  standalone: true
})
export class ProductList implements OnInit {
  products: any[] = [];
  showImage = false;
  filter = '';
  selectedRating: number | null = null;
  editingId: number | null = null;
  editCache: any = {};

  newProduct: any = {
    productName: '',
    code: '',
    available: '',
    price: null,
    rating: null,
    image: ''
  };

  showAddForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/products')
      .subscribe(data => {
        this.products = data;
      });
  }

  get filteredProducts() {
    return this.products.filter(p =>
      p.productName?.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  onRatingClick(rating: number) {
    this.selectedRating = rating;
    console.log(`the rating ${rating} was clicked`);
  }

  editProduct(product: any) {
    this.editingId = product.id;
    this.editCache = { ...product };
  }

  saveEdit(id: number) {
    if (
      this.editCache.rating !== null &&
      (this.editCache.rating < 0 || this.editCache.rating > 5)
    ) {
      alert('La note doit être comprise entre 0 et 5');
      return;
    }
    this.http.put(`http://localhost:3000/products/${id}`, this.editCache)
      .subscribe(() => {
        const idx = this.products.findIndex(p => p.id === id);
        if (idx !== -1) {
          this.products[idx] = { ...this.editCache };
        }
        this.editingId = null;
        this.editCache = {};
      });
  }

  cancelEdit() {
    this.editingId = null;
    this.editCache = {};
  }

  deleteProduct(id: number) {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }

  addProduct() {
    if (!this.newProduct.productName) {
      alert('Le nom du produit est obligatoire');
      return;
    }
    if (
      this.newProduct.rating !== null &&
      (this.newProduct.rating < 0|| this.newProduct.rating > 5)
    ) {
      alert('La note doit être comprise entre 0 et 5');
      return;
    }
    this.http.post('http://localhost:3000/products', this.newProduct)
      .subscribe((res: any) => {
        this.products.push({ ...this.newProduct, id: res.id });
        this.newProduct = {
          productName: '',
          code: '',
          available: '',
          price: null,
          rating: null,
          image: ''
        };
      });
  }
}
