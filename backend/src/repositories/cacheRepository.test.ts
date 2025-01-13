import { describe, test, expect } from '@jest/globals';
import { CacheRepository } from './cacheRepository';
describe('CacheRepository', () => {

    test('should return null if the key does not exist', async () => {
        const result = await CacheRepository.get('non-existing-key');
        expect(result).toBeNull();
    });

    test('should set a value in the cache', async () => {
        const product = {
            id: '1',
            name: 'Product 1',
            price: 100
        };
        await CacheRepository.set(product);
        const result = await CacheRepository.get('1');
        expect(result).toEqual(product);
    });

    test('should return all values in the cache', async () => {
        const products = [
            {
                id: '1',
                name: 'Product 1',
                price: 100
            },
            {
                id: '2',
                name: 'Product 2',
                price: 200
            }
        ];
        await CacheRepository.setAll(products);
        const result = await CacheRepository.getAll();
        expect(result).toEqual(products);
    });

    test('should clear all values in the cache', async () => {
        const products = [
            {
                id: '1',
                name: 'Product 1',
                price: 100
            },
            {
                id: '2',
                name: 'Product 2',
                price: 200
            }
        ];
        await CacheRepository.setAll(products);
        await CacheRepository.clearAll();
        const result = await CacheRepository.getAll();
        expect(result).toEqual([])
    });
});