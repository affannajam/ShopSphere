import type { Product, Order } from './types';
import { PlaceHolderImages } from './placeholder-images';

const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

export const products: Product[] = [
  { id: 'prod1', name: 'Aura Wireless Headphones', description: 'Experience immersive sound with these noise-cancelling wireless headphones. Long-lasting battery and comfortable design for all-day listening.', price: 199.99, category: 'Electronics', rating: 4.8, stock: 25, imageUrl: imageMap.get('prod1')!.imageUrl, imageHint: imageMap.get('prod1')!.imageHint },
  { id: 'prod2', name: 'Nomad Leather Jacket', description: 'A timeless leather jacket made from premium materials. Perfect for any season and adds a touch of classic style to any outfit.', price: 349.99, category: 'Apparel', rating: 4.9, stock: 15, imageUrl: imageMap.get('prod2')!.imageUrl, imageHint: imageMap.get('prod2')!.imageHint },
  { id: 'prod3', name: 'The Ember Stone', description: 'The first book in the epic fantasy series "Chronicles of Aethel". A thrilling adventure of magic, monsters, and destiny.', price: 19.99, category: 'Books', rating: 4.6, stock: 100, imageUrl: imageMap.get('prod3')!.imageUrl, imageHint: imageMap.get('prod3')!.imageHint },
  { id: 'prod4', name: 'Serene Ceramic Vase', description: 'A beautifully crafted minimalist vase. Its elegant design complements any home decor, perfect for fresh flowers or as a standalone piece.', price: 49.99, category: 'Home Goods', rating: 4.7, stock: 40, imageUrl: imageMap.get('prod4')!.imageUrl, imageHint: imageMap.get('prod4')!.imageHint },
  { id: 'prod5', name: 'Pulse Gaming Mouse', description: 'Gain a competitive edge with this high-precision gaming mouse. Featuring customizable RGB lighting and programmable buttons.', price: 79.99, category: 'Electronics', rating: 4.5, stock: 60, imageUrl: imageMap.get('prod5')!.imageUrl, imageHint: imageMap.get('prod5')!.imageHint },
  { id: 'prod6', name: 'Everyday Cotton Tee', description: 'A soft and breathable t-shirt for everyday comfort. Made from 100% organic cotton, available in various colors.', price: 29.99, category: 'Apparel', rating: 4.4, stock: 200, imageUrl: imageMap.get('prod6')!.imageUrl, imageHint: imageMap.get('prod6')!.imageHint },
  { id: 'prod7', name: 'Global Cuisine Cookbook', description: 'Explore flavors from around the world with over 200 recipes. Easy-to-follow instructions for both beginners and expert chefs.', price: 34.99, category: 'Books', rating: 4.8, stock: 75, imageUrl: imageMap.get('prod7')!.imageUrl, imageHint: imageMap.get('prod7')!.imageHint },
  { id: 'prod8', name: 'Lumina Smart Lamp', description: 'Control your lighting with this smart LED lamp. Adjust brightness and color via your smartphone or voice commands.', price: 89.99, category: 'Home Goods', rating: 4.7, stock: 30, imageUrl: imageMap.get('prod8')!.imageUrl, imageHint: imageMap.get('prod8')!.imageHint },
];

export const orders: Order[] = [
    {
        id: 'ORD001',
        date: '2023-10-15',
        total: 229.98,
        status: 'Delivered',
        items: [
            { id: 'prod1', name: 'Aura Wireless Headphones', price: 199.99, quantity: 1, imageUrl: imageMap.get('prod1')!.imageUrl },
            { id: 'prod6', name: 'Everyday Cotton Tee', price: 29.99, quantity: 1, imageUrl: imageMap.get('prod6')!.imageUrl }
        ],
        shippingAddress: { street: '123 Tech Ave', city: 'Innovate', state: 'CA', zip: '94043' }
    },
    {
        id: 'ORD002',
        date: '2023-10-28',
        total: 104.98,
        status: 'Shipped',
        items: [
            { id: 'prod4', name: 'Serene Ceramic Vase', price: 49.99, quantity: 1, imageUrl: imageMap.get('prod4')!.imageUrl },
            { id: 'prod7', name: 'Global Cuisine Cookbook', price: 34.99, quantity: 1, imageUrl: imageMap.get('prod7')!.imageUrl }
        ],
        shippingAddress: { street: '456 Market St', city: 'Metro', state: 'NY', zip: '10001' }
    }
];
