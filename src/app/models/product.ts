export class Product {
  _id: string;
  name: string;
  price: number;
  company: string;
  rating: number;
  image: string;
  quantity: number;
  subtotal: number;

  constructor(
    id: string,
    name: string,
    price: number,
    company: string,
    rating: number,
    image: string,
    quantity: number,
    subtotal: number
  ) {
    this._id = id;
    this.name = name
    this.price = price
    this.company = company
    this.rating = rating
    this.image = image
    this.quantity = quantity
    this.subtotal = subtotal
  }
}
