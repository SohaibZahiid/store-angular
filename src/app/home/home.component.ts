import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  // Filters
  filterForm!: FormGroup;
  mostExpensiveProduct!: number;

  constructor(
    private httpService: StoreService,
    private cartService: CartService
  ) {
    this.getAllProducts();
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getFilteredProducts();
  }

  getAllProducts() {
    this.httpService.getAllProducts().subscribe((res: Product[]) => {
      this.products = res;

      this.mostExpensiveProduct = res.reduce((p, c) =>
        p.price > c.price ? p : c
      ).price;

      this.clearFilters();
    });
  }

  getFilteredProducts() {
    this.filterForm.valueChanges
      .pipe(switchMap((v) => this.httpService.getFilteredProducts(v)))
      .subscribe((value) => {
        this.products = value;
      });
  }

  clearFilters() {
    this.filterForm.reset({
      search: '',
      category: 'all',
      company: 'all',
      price: this.mostExpensiveProduct,
      sort: 'price-lowest',
    });
  }

  initializeForm() {
    this.filterForm = new FormGroup({
      search: new FormControl(''),
      category: new FormControl('all'),
      company: new FormControl('all'),
      price: new FormControl(this.mostExpensiveProduct),
      sort: new FormControl('price-lowest'),
    });
  }

  addToCart(product: Product) {
    const p = new Product(
      product._id,
      product.name,
      product.price,
      product.company,
      product.rating,
      product.image,
      (product.quantity = 1),
      (product.subtotal = product.price)
    );
    this.cartService.addToCart(p);
  }

  // getSearchedProducts(search: string) {
  //   if (!search) {
  //     this.getAllProducts();
  //   } else {F
  //     this.httpService
  //       .getSearchedProducts(search.toLocaleLowerCase())
  //       .subscribe((res: Product[]) => {
  //         this.products = res;
  //       });
  //   }
  // }

  // getCompanyProducts(company: string) {
  //   if (company === 'all') {
  //     this.getAllProducts();
  //   } else {
  //     this.httpService
  //       .getCompanyProducts(company.toLocaleLowerCase())
  //       .subscribe((res: Product[]) => {
  //         this.products = res;
  //       });
  //   }
  // }

  // getPriceProducts(range: string) {
  //   this.price = Number(range);
  //   this.httpService
  //     .getPriceProducts(this.price)
  //     .subscribe((res: Product[]) => {
  //       this.products = res;
  //     });
  // }

  // getSortedProducts(sort: string) {
  //   if (sort == 'price-lowest') sort = 'price';
  //   if (sort == 'price-highest') sort = '-price';
  //   if (sort == 'name-a') sort = 'name';
  //   if (sort == 'name-z') sort = '-name';

  //   this.httpService.getSortedProducts(sort).subscribe((res: Product[]) => {
  //     this.products = res;
  //   });
  // }
}
