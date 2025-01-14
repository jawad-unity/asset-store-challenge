import { Product, ProductDetails } from "../entities/Product";
import { LEGACY_SERVICE_API } from "../utils/constants";
import { cache, CACHE_KEYS } from "./CacheService";
import { PriceService } from "./PriceService";

export namespace ProductService {
    export async function getProducts(): Promise<Product[]> {
        // Try to get products from cache
        const cachedProducts = cache.get<Product[]>(CACHE_KEYS.ALL_PRODUCTS);
        if (cachedProducts) {
            return cachedProducts;
        }

        try {
            const response = await fetch(`${LEGACY_SERVICE_API}/products`);
            const data = await response.json();
            const products = data.products ?? [];

            // Cache the products
            cache.set(CACHE_KEYS.ALL_PRODUCTS, products);

            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    export async function getProduct(id: string): Promise<ProductDetails | null> {
        // Try to get product details from cache
        const cacheKey = CACHE_KEYS.PRODUCT_DETAILS(id);
        const cachedProduct = cache.get<ProductDetails>(cacheKey);
        if (cachedProduct) {
            return cachedProduct;
        }

        try {
            const products = await getProducts();
            const product = products.find(product => product.id === id);

            if (!product) {
                console.info(`Product with ID ${id} not found`);
                return null;
            }

            const price = await PriceService.getPrice(id);
            const productDetails: ProductDetails = { ...product, price };

            // Cache the product details
            cache.set(cacheKey, productDetails);

            return productDetails;
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            return null;
        }
    }
}