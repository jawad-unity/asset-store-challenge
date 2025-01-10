import { ProductDetails } from "../entities/Product";
import { CACHE_TTL } from "../utils/constants";

export namespace CacheRepository {
    const cache = new Map<string, ProductDetails>();
    const expiryTime = new Date().getTime() + CACHE_TTL;

    export async function setAll(products: ProductDetails[]): Promise<void> {
        cache.clear();
        products.forEach(product => cache.set(product.id, product));
    }

    export async function clearAll(): Promise<void> {
        cache.clear();
    }

    export async function getAll(): Promise<ProductDetails[] | null> {
        if (new Date().getTime() > expiryTime) {
            cache.clear();
            return null;
        }
        return Array.from(cache.values());
    }

    export async function get(id: string): Promise<ProductDetails | null> {
        if (new Date().getTime() > expiryTime) {
            cache.clear();
            return null;
        }
        return cache.get(id) ?? null;
    }

    export async function set(product: ProductDetails): Promise<void> {
        cache.set(product.id, product);
    }
}