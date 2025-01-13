import useSWR, { Fetcher } from 'swr';
import { BACKEND_API_URL } from '@/lib/constants'
import { Product } from '@/lib/products';


/*
 * This is a sample fetcher hook in case SEO is not important for product information.
 */

export const productsFetcher: Fetcher<Product[]> = async () => {
    const response = await fetch(`${BACKEND_API_URL}/products`, {
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
        }
    }
    );
    return response.json();
};


export const productFetcher: Fetcher<Product> = async (id: string) => {
    const response = await fetch(`${BACKEND_API_URL}/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
        }
    }
    );
    return response.json();
};


export function useProducts() {
    return useSWR<Product[]>('/api/products', productsFetcher);
}

export function useProduct(id: string) {
    return useSWR<Product>(`/api/products/${id}`, productFetcher);
}
