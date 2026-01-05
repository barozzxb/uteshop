//type for data in project

export interface Image {
    _id: string,
    url: string,
    alt: string,
}
export interface Product {
  _id: string;
  sku: string;
  name: string;
  genre: string;
  description?: string;
  price: number;
  originalPrice?: number
  images: Image[];
  avatar?: string;
  brand?: string;
  rating?: number;
  stock: number;
  salesCount: number;
  commentCount: number;
  createdAt: string;
}
export interface ProductPageResponse {
    page: number,
    totalPages: number,
    limit: number,
    total: number,
    items: [Product]
}

export interface Comment {
    _id: string,
    userId: string,
    content: string,
    createdAt: string,

}

export interface Cart {
    _id: string;
    items: CartItem[];
}

export interface CartItem {
    _id: string;
    productId: Product;
    quantity: number;
    price: number;
}

export type ShippingAddress = {
    type: "HOME" | "OFFICE" | "OTHER";
    country: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
};

export type OrderProduct = {
  _id: string;
  name: string;
  price: number;
};

export type OrderItem = {
  _id: string;
  product: OrderProduct;
  quantity: number;
  price: number;
};

export type Account = {
  _id: string;
  email: string;
};

export type Order = {
  _id: string;
  account: Account;
  orderItems: OrderItem[];
  totalPrice: number;
  status: "NEW" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
  paymentMethod: "COD" | "ONLINE";
  paymentStatus: "UNPAID" | "PAID" | "REFUNDED";
  note?: string;
  receiverPhone: string;
  shippingAddress?: ShippingAddress;
  createdAt: string;
};

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
