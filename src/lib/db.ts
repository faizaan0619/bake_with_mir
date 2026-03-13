import { Redis } from '@upstash/redis';
import { Product, Order, Review, GalleryItem, SEED_PRODUCTS, SEED_GALLERY } from './data';

// Initialize Redis client — uses env vars automatically
// KV_REST_API_URL / KV_REST_API_TOKEN (set by Vercel KV integration)
function getRedis(): Redis {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error('Missing KV_REST_API_URL or KV_REST_API_TOKEN environment variables');
  }
  return new Redis({ url, token });
}

const PRODUCTS_KEY = 'bwm_products';
const ORDERS_KEY = 'bwm_orders';
const REVIEWS_KEY = 'bwm_reviews';
const GALLERY_KEY = 'bwm_gallery';

// ─── Products ───────────────────────────────────────────

export async function dbGetProducts(): Promise<Product[]> {
  const redis = getRedis();
  const data = await redis.get<Product[]>(PRODUCTS_KEY);
  if (!data) {
    await redis.set(PRODUCTS_KEY, SEED_PRODUCTS);
    return SEED_PRODUCTS;
  }
  return data;
}

export async function dbSaveProducts(products: Product[]): Promise<void> {
  const redis = getRedis();
  await redis.set(PRODUCTS_KEY, products);
}

export async function dbAddProduct(product: Omit<Product, 'id'>): Promise<void> {
  const products = await dbGetProducts();
  const newId = String(Math.max(...products.map(p => Number(p.id)), 0) + 1);
  products.push({ ...product, id: newId });
  await dbSaveProducts(products);
}

export async function dbUpdateProduct(updated: Product): Promise<void> {
  const products = await dbGetProducts();
  const index = products.findIndex(p => p.id === updated.id);
  if (index >= 0) {
    products[index] = updated;
    await dbSaveProducts(products);
  }
}

export async function dbDeleteProduct(id: string): Promise<void> {
  const products = (await dbGetProducts()).filter(p => p.id !== id);
  await dbSaveProducts(products);
}

export async function dbUpdateStock(id: string, stock: Product['stock']): Promise<void> {
  const products = await dbGetProducts();
  const product = products.find(p => p.id === id);
  if (product) {
    product.stock = stock;
    await dbSaveProducts(products);
  }
}

// ─── Orders ─────────────────────────────────────────────

export async function dbGetOrders(): Promise<Order[]> {
  const redis = getRedis();
  const data = await redis.get<Order[]>(ORDERS_KEY);
  return data || [];
}

export async function dbSaveOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
  const orders = await dbGetOrders();
  const newOrder: Order = {
    ...order,
    id: String(Date.now()),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  const redis = getRedis();
  await redis.set(ORDERS_KEY, orders);
  return newOrder;
}

export async function dbUpdateOrderStatus(id: string, status: Order['status']): Promise<void> {
  const orders = await dbGetOrders();
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    const redis = getRedis();
    await redis.set(ORDERS_KEY, orders);
  }
}

// ─── Reviews ────────────────────────────────────────────

export async function dbGetReviews(): Promise<Review[]> {
  const redis = getRedis();
  const data = await redis.get<Review[]>(REVIEWS_KEY);
  return data || [];
}

export async function dbSaveReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  const reviews = await dbGetReviews();
  const newReview: Review = {
    ...review,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  const redis = getRedis();
  await redis.set(REVIEWS_KEY, reviews);
  return newReview;
}

// ─── Gallery ────────────────────────────────────────────

export async function dbGetGalleryItems(): Promise<GalleryItem[]> {
  const redis = getRedis();
  const data = await redis.get<GalleryItem[]>(GALLERY_KEY);
  if (!data) {
    await redis.set(GALLERY_KEY, SEED_GALLERY);
    return SEED_GALLERY;
  }
  return data;
}

export async function dbAddGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<void> {
  const items = await dbGetGalleryItems();
  items.push({ ...item, id: 'g' + Date.now() });
  const redis = getRedis();
  await redis.set(GALLERY_KEY, items);
}

export async function dbDeleteGalleryItem(id: string): Promise<void> {
  const items = (await dbGetGalleryItems()).filter(i => i.id !== id);
  const redis = getRedis();
  await redis.set(GALLERY_KEY, items);
}

// ─── Admin ──────────────────────────────────────────────

const ADMIN_PIN = '3296';

export function dbVerifyAdminPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}
