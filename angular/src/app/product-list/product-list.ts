import { Component } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
showImage = false;
  filter = '';
  products = [
    {
      productName: 'Leaf Rake',
      code: 'gdn 0011',
      available: 'March 19, 2021',
      price: 19.95,
      rating: 3.5
    },
    {
      productName: 'Garden Cart',
      code: 'gdn 0023',
      available: 'March 18, 2021',
      price: 32.99,
      rating: 4.2
    },
    {
      productName: 'Hammer',
      code: 'tbx 0048',
      available: 'May 21, 2021',
      price: 8.90,
      rating: 4.8
    },
    {
      productName: 'Saw',
      code: 'tbx 0022',
      available: 'May 15, 2021',
      price: 11.55,
      rating: 3.7
    },
    {
      productName: 'Video Game Controller',
      code: 'gmg 0042',
      available: 'October 15, 2020',
      price: 35.95,
      rating: 4.6
    }
  ];

  get filteredProducts() {
    return this.products.filter(p =>
      p.productName.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}
