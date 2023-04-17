import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  totalCart!: any;

  constructor(private cartService: CartService) {}


  ngOnInit(): void {
    this.getCart();
    this.getTotal()
  }

  deleteProduct(id: string) {
    this.cartService.deleteProduct(id);
    this.getCart();
    this.getTotal()
  }

  clearCart() {
    this.cartService.clearCart();
    this.getCart();
  }

  getCart() {
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    this.totalCart = this.cartService.totalCart
  }

  increaseQuantity(product: Product) {
    this.cartService.increaseQuantity(product)
    this.getCart();
    this.getTotal()
  }

  decreaseQuantity(product: Product) {
    this.cartService.decreaseQuantity(product)
    this.getCart();
    this.getTotal()
  }

  // changeQuantity(product: Product) {
  //   this.cartService.changeQuantity(product)
  // }
}
