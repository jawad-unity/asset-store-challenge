import { PriceInfo } from "../entities/Product";
import { CacheRepository } from "../repositories/cacheRepository";
import { LEGACY_SERVICE_API } from "../utils/constants";

export namespace PriceService {
    export async function getPrice(productId: string): Promise<number> {

        const product = await CacheRepository.get(productId);
        if (product?.price) {
            return product.price;
        }

        const response = await fetch(`${LEGACY_SERVICE_API}/products/price?id=${productId}`);
        const data = await response.json() as PriceInfo;

        return data.price;
    }
}