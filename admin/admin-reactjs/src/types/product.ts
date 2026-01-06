export interface Product {
  _id: string;
  sku: string;
  name: string;
  genre: string;
  price: number;
  stock: number;
  brand?: string;
  createdAt: string;
}

export interface ProductPayload {
  sku: string;
  name: string;
  genre: string;
  price: number;
  originalPrice?: number;
  stock?: number;
  brand?: string;
}