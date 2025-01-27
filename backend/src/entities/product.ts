export interface Product {
    id: string;
    name: string;
}

export interface ProductDetails extends Product {
    price?: number;
}

export interface PriceInfo {
    price: number;
}