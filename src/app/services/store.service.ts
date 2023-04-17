import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment.development';
import { Filter } from '../interfaces/filter';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = environment.apiUrl;
  private cart: Product[] = []

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?sort=price`);
  }

  // getSearchedProducts(search: string): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}/products?name=${search}`);
  // }

  // getCompanyProducts(company: string): Observable<Product[]> {
  //   return this.http.get<Product[]>(
  //     `${this.apiUrl}/products?company=${company}`
  //   );
  // }

  // getPriceProducts(price: number): Observable<Product[]> {
  //   return this.http.get<Product[]>(
  //     `${this.apiUrl}/products?numericFilters=price<=${price}`
  //   );
  // }

  // getSortedProducts(sort: string): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}/products?sort=${sort}`);
  // }

  getFilteredProducts(filters: Filter): Observable<Product[]> {
    let filtersStringsArr: any = [];

    if (filters.search) {
      filtersStringsArr.push(`name=${filters.search}`);
    }

    if (filters.category && filters.category !== 'all') {
      filtersStringsArr.push(`category=${filters.category}`);
    }

    if (filters.company && filters.company !== 'all') {
      filtersStringsArr.push(`company=${filters.company}`);
    }

    if (filters.price || filters.price === 0) {
      filtersStringsArr.push(`numericFilters=price<=${filters.price}`);
    }

    if (filters.sort) {
      if (filters.sort == 'price-lowest') filters.sort = 'price';
      if (filters.sort == 'price-highest') filters.sort = '-price';
      if (filters.sort == 'name-a') filters.sort = 'name';
      if (filters.sort == 'name-z') filters.sort = '-name';

      filtersStringsArr.push(`sort=${filters.sort}`);
    }


    const str = filtersStringsArr.join('&');

    return this.http.get<Product[]>(`${this.apiUrl}/products?${str}`);
  }

  

}
