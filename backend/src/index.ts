import express from 'express';
import { ProductService } from './services/ProductService';
import middleware from './middleware';

const app = express()
const port = 3000

const LEGACY_SERVICE_API = 'http://legacy-backend:9991/api';

app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductService.getProducts();
    return res.json(products);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await ProductService.getProduct(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
