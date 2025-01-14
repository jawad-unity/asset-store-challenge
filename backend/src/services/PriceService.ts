import { PriceInfo } from "../entities/Product";
import { LEGACY_SERVICE_API } from "../utils/constants";
import { cache, CACHE_KEYS } from "./CacheService";

export namespace PriceService {
    export async function getPrice(productId: string): Promise<number> {
        try {
            // Try to get price from cache
            const cacheKey = CACHE_KEYS.PRICE(productId);
            const cachedPrice = cache.get<number>(cacheKey);

            if (cachedPrice !== undefined) {
                return cachedPrice;
            }

            // Fetch price from API
            const response = await fetch(`${LEGACY_SERVICE_API}/products/price?id=${productId}`);
            const data = await response.json() as PriceInfo;

            // Cache the price
            cache.set(cacheKey, data.price);

            return data.price;
        } catch (error) {
            console.error(`Error fetching price for product ${productId}:`, error);
            throw error; // Throw the error as price is crucial for business logic
        }
    }
}