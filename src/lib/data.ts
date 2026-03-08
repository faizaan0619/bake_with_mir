// Product and Order data layer using localStorage
// Seed data for the bakery

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: 'available' | 'low' | 'out';
  featured: boolean;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  productId: string;
  productName: string;
  quantity: number;
  customMessage: string;
  deliveryDate: string;
  specialInstructions: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'All', emoji: '🍰' },
  { id: 'birthday-cakes', name: 'Birthday Cakes', emoji: '🎂' },
  { id: 'pastries', name: 'Pastries', emoji: '🥐' },
  { id: 'cupcakes', name: 'Cupcakes', emoji: '🧁' },
  { id: 'cookies', name: 'Cookies', emoji: '🍪' },
  { id: 'bread', name: 'Bread', emoji: '🍞' },
  { id: 'custom-cakes', name: 'Custom Cakes', emoji: '🎀' },
];

const SEED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Vanilla Birthday Cake',
    price: 899,
    category: 'birthday-cakes',
    image: '/images/birthday-cake.png',
    description: 'A beautiful three-tier vanilla cake with pastel pink and cream frosting, decorated with delicate flowers.',
    stock: 'available',
    featured: true,
  },
  {
    id: '2',
    name: 'Chocolate Truffle Cake',
    price: 999,
    category: 'birthday-cakes',
    image: '/images/birthday-cake.png',
    description: 'Rich dark chocolate cake layered with chocolate truffle filling and ganache frosting.',
    stock: 'available',
    featured: true,
  },
  {
    id: '3',
    name: 'Red Velvet Cake',
    price: 1099,
    category: 'birthday-cakes',
    image: '/images/birthday-cake.png',
    description: 'Classic red velvet cake with cream cheese frosting and white chocolate shavings.',
    stock: 'low',
    featured: false,
  },
  {
    id: '4',
    name: 'Chocolate Croissant',
    price: 120,
    category: 'pastries',
    image: '/images/chocolate-pastry.png',
    description: 'Flaky, buttery croissant filled with premium dark chocolate.',
    stock: 'available',
    featured: true,
  },
  {
    id: '5',
    name: 'Almond Danish',
    price: 150,
    category: 'pastries',
    image: '/images/chocolate-pastry.png',
    description: 'Golden puff pastry topped with almond cream and sliced almonds.',
    stock: 'available',
    featured: false,
  },
  {
    id: '6',
    name: 'Butter Puff Pastry',
    price: 80,
    category: 'pastries',
    image: '/images/chocolate-pastry.png',
    description: 'Light and crispy butter puff pastry, freshly baked every morning.',
    stock: 'available',
    featured: false,
  },
  {
    id: '7',
    name: 'Vanilla Cupcakes (Box of 6)',
    price: 450,
    category: 'cupcakes',
    image: '/images/cupcakes.png',
    description: 'Soft vanilla cupcakes topped with swirled buttercream in assorted colors.',
    stock: 'available',
    featured: true,
  },
  {
    id: '8',
    name: 'Chocolate Cupcakes (Box of 6)',
    price: 480,
    category: 'cupcakes',
    image: '/images/cupcakes.png',
    description: 'Rich chocolate cupcakes with chocolate ganache frosting.',
    stock: 'available',
    featured: false,
  },
  {
    id: '9',
    name: 'Red Velvet Cupcakes (Box of 6)',
    price: 520,
    category: 'cupcakes',
    image: '/images/cupcakes.png',
    description: 'Moist red velvet cupcakes with cream cheese topping.',
    stock: 'low',
    featured: false,
  },
  {
    id: '10',
    name: 'Chocolate Chip Cookies (12 pcs)',
    price: 350,
    category: 'cookies',
    image: '/images/cookies.png',
    description: 'Classic chocolate chip cookies, crispy on the outside, chewy on the inside.',
    stock: 'available',
    featured: true,
  },
  {
    id: '11',
    name: 'Butter Cookies Tin',
    price: 499,
    category: 'cookies',
    image: '/images/cookies.png',
    description: 'Premium Danish-style butter cookies in an elegant tin box.',
    stock: 'available',
    featured: false,
  },
  {
    id: '12',
    name: 'Decorated Sugar Cookies (6 pcs)',
    price: 280,
    category: 'cookies',
    image: '/images/cookies.png',
    description: 'Hand-decorated sugar cookies, perfect as gifts or party treats.',
    stock: 'out',
    featured: false,
  },
  {
    id: '13',
    name: 'Artisan Sourdough Bread',
    price: 250,
    category: 'bread',
    image: '/images/bread.png',
    description: 'Handcrafted sourdough bread with a perfect golden crust and soft interior.',
    stock: 'available',
    featured: true,
  },
  {
    id: '14',
    name: 'Whole Wheat Bread',
    price: 180,
    category: 'bread',
    image: '/images/bread.png',
    description: 'Healthy whole wheat bread, freshly baked daily with natural ingredients.',
    stock: 'available',
    featured: false,
  },
  {
    id: '15',
    name: 'Garlic Bread Loaf',
    price: 200,
    category: 'bread',
    image: '/images/bread.png',
    description: 'Oven-baked garlic bread loaded with butter and aromatic herbs.',
    stock: 'available',
    featured: false,
  },
  {
    id: '16',
    name: 'Custom Wedding Cake',
    price: 3500,
    category: 'custom-cakes',
    image: '/images/custom-cake.png',
    description: 'Two-tier elegant wedding cake with fondant finish and floral decorations. Customizable design.',
    stock: 'available',
    featured: true,
  },
  {
    id: '17',
    name: 'Custom Photo Cake',
    price: 1299,
    category: 'custom-cakes',
    image: '/images/custom-cake.png',
    description: 'Personalized photo cake with edible printing. Send us your design!',
    stock: 'available',
    featured: false,
  },
  {
    id: '18',
    name: 'Custom Theme Cake',
    price: 1999,
    category: 'custom-cakes',
    image: '/images/custom-cake.png',
    description: 'Fully customizable themed cake for birthdays, anniversaries, and special occasions.',
    stock: 'available',
    featured: false,
  },
  {
    id: '19',
    name: 'Strawberry Shortcake',
    price: 799,
    category: 'birthday-cakes',
    image: '/images/birthday-cake.png',
    description: 'Light sponge cake layered with fresh strawberries and whipped cream.',
    stock: 'available',
    featured: false,
  },
  {
    id: '20',
    name: 'Cinnamon Rolls (4 pcs)',
    price: 320,
    category: 'pastries',
    image: '/images/chocolate-pastry.png',
    description: 'Soft, warm cinnamon rolls drizzled with cream cheese glaze.',
    stock: 'available',
    featured: false,
  },
];

const PRODUCTS_KEY = 'bwm_products';
const ORDERS_KEY = 'bwm_orders';
const REVIEWS_KEY = 'bwm_reviews';
const GALLERY_KEY = 'bwm_gallery';
const ADMIN_PIN = '3296';

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
}

const SEED_GALLERY: GalleryItem[] = [
  { id: 'g1', src: '/images/birthday-cake.png', caption: 'Classic Vanilla Birthday Cake' },
  { id: 'g2', src: '/images/chocolate-pastry.png', caption: 'Chocolate Croissant' },
  { id: 'g3', src: '/images/cupcakes.png', caption: 'Assorted Cupcakes' },
  { id: 'g4', src: '/images/cookies.png', caption: 'Cookie Collection' },
  { id: 'g5', src: '/images/bread.png', caption: 'Artisan Sourdough Bread' },
  { id: 'g6', src: '/images/custom-cake.png', caption: 'Custom Wedding Cake' },
  { id: 'g7', src: '/images/bakery-interior.png', caption: 'Our Cozy Bakery' },
  { id: 'g8', src: '/images/banner.png', caption: 'Bake With Mir — A Delightful Choice' },
];

export function getGalleryItems(): GalleryItem[] {
  if (typeof window === 'undefined') return SEED_GALLERY;
  const stored = localStorage.getItem(GALLERY_KEY);
  if (!stored) {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(SEED_GALLERY));
    return SEED_GALLERY;
  }
  return JSON.parse(stored);
}

export function addGalleryItem(item: Omit<GalleryItem, 'id'>): void {
  const items = getGalleryItems();
  items.push({ ...item, id: 'g' + Date.now() });
  if (typeof window !== 'undefined') {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
  }
}

export function deleteGalleryItem(id: string): void {
  const items = getGalleryItems().filter(i => i.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
  }
}

// Initialize products from seed data if not present
function initProducts(): Product[] {
  if (typeof window === 'undefined') return SEED_PRODUCTS;
  
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
    return SEED_PRODUCTS;
  }
  return JSON.parse(stored);
}

export function getProducts(): Product[] {
  return initProducts();
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  const products = getProducts();
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter(p => p.featured);
}

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase();
  return getProducts().filter(
    p => p.name.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower)
  );
}

export function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function updateProduct(updated: Product): void {
  const products = getProducts();
  const index = products.findIndex(p => p.id === updated.id);
  if (index >= 0) {
    products[index] = updated;
    saveProducts(products);
  }
}

export function addProduct(product: Omit<Product, 'id'>): void {
  const products = getProducts();
  const newId = String(Math.max(...products.map(p => Number(p.id))) + 1);
  products.push({ ...product, id: newId });
  saveProducts(products);
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
}

export function updateStock(id: string, stock: Product['stock']): void {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (product) {
    product.stock = stock;
    saveProducts(products);
  }
}

// Orders
export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(ORDERS_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function saveOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: String(Date.now()),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order['status']): void {
  const orders = getOrders();
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    if (typeof window !== 'undefined') {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }
}

export function verifyAdminPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}

export function generateWhatsAppLink(order: {
  name: string;
  phone: string;
  productName: string;
  quantity: number;
  customMessage: string;
  deliveryDate: string;
  specialInstructions: string;
}): string {
  const message = `🍰 *New Order - Bake With Mir*

👤 *Name:* ${order.name}
📞 *Phone:* ${order.phone}
🎂 *Product:* ${order.productName}
📦 *Quantity:* ${order.quantity}
📅 *Delivery/Pickup Date:* ${order.deliveryDate}
${order.customMessage ? `💬 *Custom Message for Cake:* ${order.customMessage}` : ''}
${order.specialInstructions ? `📝 *Special Instructions:* ${order.specialInstructions}` : ''}

Thank you for choosing Bake With Mir! 🧁`;

  return `https://wa.me/919149774989?text=${encodeURIComponent(message)}`;
}

// Reviews
export function getReviews(): Review[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(REVIEWS_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function saveReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  if (typeof window !== 'undefined') {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }
  return newReview;
}

export function getAverageRating(): { average: number; count: number } {
  const reviews = getReviews();
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return { average: Math.round((sum / reviews.length) * 10) / 10, count: reviews.length };
}
