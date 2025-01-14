import NodeCache from "node-cache";

export const cache = new NodeCache({
    stdTTL: 600, // 10 minutes
    checkperiod: 60, // 1 minute
    useClones: false
});

export const CACHE_KEYS = {
    PRICE: (id: string) => `price_${id}`,
    ALL_PRODUCTS: 'all_products',
    PRODUCT_DETAILS: (id: string) => `product_${id}`
};

// Optional: Add cache management methods
export function clearCache(): void {
    cache.flushAll();
    console.info('Product cache cleared');
}

export function removeFromCache(id: string): void {
    cache.del(CACHE_KEYS.PRODUCT_DETAILS(id));
    cache.del(CACHE_KEYS.ALL_PRODUCTS);
    console.info(`Product ${id} removed from cache`);
}

export function clearPriceCache(): void {
    cache.flushAll();
    console.info('Price cache cleared');
}

export function removePriceFromCache(productId: string): void {
    const cacheKey = CACHE_KEYS.PRICE(productId);
    cache.del(cacheKey);
    console.info(`Price for product ${productId} removed from cache`);
}

export function updatePriceInCache(productId: string, price: number): void {
    const cacheKey = CACHE_KEYS.PRICE(productId);
    cache.set(cacheKey, price);
    console.info(`Price for product ${productId} updated in cache`);
}
