import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: any[] = [];
  showImage = false;
  filter = '';

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
    console.log(`the rating ${rating} was clicked`);
  }
}
