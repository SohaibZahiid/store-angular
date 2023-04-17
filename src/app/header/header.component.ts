import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    // Cart
    productsInCart!: number

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
      this.cartService.totalCartProductsSubject.subscribe(res => {
        this.productsInCart = res
      })
    }
}
