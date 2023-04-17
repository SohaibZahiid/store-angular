import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = this.getCart() || [];
  totalCartProducts: number =
    JSON.parse(localStorage.getItem('cart')!)?.length || 0;
  totalCartProductsSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(this.totalCartProducts);
  totalCart: number = this.getTotal() || 0;

  constructor() {}

  addToCart(product: Product) {
    const exists = this.cart.findIndex((p) => p._id == product._id) > -1;
    if (!exists) {
      this.cart.push(product);
      this.setCart(this.cart);
      this.totalCartProductsSubject.next((this.totalCartProducts += 1));
      this.setTotal();
    } else {
      // let newProduct = new Product(
      //   product._id,
      //   product.name,
      //   product.price,
      //   product.company,
      //   product.rating,
      //   product.image,
      //   (product.quantity = product.quantity + 1),
      //   (product.subtotal = product.price * 2)
      // );
      // console.log(newProduct);
      this.cart.find((p) => p._id == product._id)!.quantity += 1;
      this.cart.find((p) => p._id == product._id)!.subtotal += product.price;
      this.setCart(this.cart);
      this.setTotal();
    }
  }

  getCart() {
    return JSON.parse(localStorage.getItem('cart')!);
  }

  deleteProduct(id: string) {
    let products = this.cart.filter((p) => id !== p._id);
    this.cart = products;
    this.setCart(this.cart);
    this.totalCartProductsSubject.next((this.totalCartProducts -= 1));
    this.setTotal();
  }

  clearCart() {
    this.cart = [];
    localStorage.clear();
    this.totalCartProducts = 0;
    this.totalCartProductsSubject.next(this.totalCartProducts);
  }

  setCart(cart: Product[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  setTotal() {
    this.totalCart = this.cart
      .map((product) => product.subtotal)
      .reduce((total, num) => {
        return total + num;
      }, 0);
  }

  getTotal() {
    if(localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')!)
        .map((product: Product) => product.price)
        .reduce((total: any, num: any) => {
          return total + num;
        }, 0);
    }
  }

  increaseQuantity(product: Product) {
    this.cart.find((p) => p._id == product._id)!.quantity++;
    this.cart.find((p) => p._id == product._id)!.subtotal += product.price;
    this.setCart(this.cart);
    this.setTotal();
  }

  decreaseQuantity(product: Product) {
    const p = this.cart.find((p) => p._id == product._id)!
    if(p.quantity > 1) {
      this.cart.find((p) => p._id == product._id)!.quantity--;
      this.cart.find((p) => p._id == product._id)!.subtotal -= product.price;
      this.setCart(this.cart);
      this.setTotal(); 
    }
  }

  // changeQuantity(product: Product) {
  //   this.cart.find((p) => p._id == product._id)!.quantity = product.quantity;
  //   this.cart.find((p) => p._id == product._id)!.subtotal = product.price * product.quantity;
  //   this.setCart(this.cart);
  //   this.setTotal();
  // }
}
