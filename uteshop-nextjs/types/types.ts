//type for data in project

export interface Image {
    _id: string,
    url: string,
    alt: string,
}
export interface Product {
    _id: string,
    sku: string
    name: string,
    genre: string
    description: string,
    price: number,
    images: [Image],
    brand: string,
    rating: number,
    createdAt: Date

}
export interface ProductPageResponse {
    page: number,
    totalPages: number,
    limit: number,
    total: number,
    items: [Product]
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: number;
}