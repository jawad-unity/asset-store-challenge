import { Product, ProductDetails } from "../entities/Product";
import { CacheRepository } from "../repositories/cacheRepository";
import { LEGACY_SERVICE_API } from "../utils/constants";
import { PriceService } from "./PriceService";

export namespace ProductService {
    export async function getProducts(): Promise<Product[]> {

        const products = await CacheRepository.getAll();
        if (products && products.length > 0) {
            return products;
        }

        const response = await fetch(`${LEGACY_SERVICE_API}/products`);
        const data = await response.json();

        CacheRepository.setAll(data.products).then(() => {
            console.info('Products cached');
        }).catch(error => {
            console.warn(`Error caching products: ${error}`);
        });

        return data.products ?? [];
    }

    export async function getProduct(id: string): Promise<ProductDetails | null> {
        const products = await getProducts();
        const product = products.find(product => product.id === id);

        if (!product) {
            console.info(`Product with ID ${id} not found`);
            return null;
        }

        const price = await PriceService.getPrice(id);

        CacheRepository.set({ ...product, price }).then(() => {
            console.info(`Product with ID ${id} cached`);
        }).catch(error => {
            console.warn(`Error caching product with ID ${id}: ${error}`);
        });

        return { ...product, price };
    }
}