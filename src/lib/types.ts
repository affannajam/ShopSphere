export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Electronics' | 'Apparel' | 'Books' | 'Home Goods';
  rating: number;
  stock: number;
  imageUrl: string;
  imageHint: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: CartItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};
