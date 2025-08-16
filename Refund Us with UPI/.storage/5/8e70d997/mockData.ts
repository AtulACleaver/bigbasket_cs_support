import { Product, User, Order } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  walletBalance: 2500.00
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Bananas',
    price: 48,
    originalPrice: 60,
    discount: 20,
    category: 'Fruits',
    image: '/api/placeholder/200/200',
    description: 'Fresh yellow bananas, rich in potassium',
    unit: '1 kg',
    inStock: true,
    rating: 4.2,
    reviews: 234
  },
  {
    id: '2',
    name: 'Amul Fresh Milk',
    price: 28,
    category: 'Dairy',
    image: '/api/placeholder/200/200',
    description: 'Fresh full cream milk from Amul',
    unit: '500 ml',
    inStock: true,
    rating: 4.5,
    reviews: 567
  },
  {
    id: '3',
    name: 'Basmati Rice',
    price: 180,
    originalPrice: 200,
    discount: 10,
    category: 'Grains',
    image: '/api/placeholder/200/200',
    description: 'Premium quality basmati rice',
    unit: '1 kg',
    inStock: true,
    rating: 4.3,
    reviews: 189
  },
  {
    id: '4',
    name: 'Red Onions',
    price: 35,
    category: 'Vegetables',
    image: '/api/placeholder/200/200',
    description: 'Fresh red onions from local farms',
    unit: '1 kg',
    inStock: true,
    rating: 4.1,
    reviews: 145
  },
  {
    id: '5',
    name: 'Britannia Good Day Cookies',
    price: 45,
    originalPrice: 50,
    discount: 10,
    category: 'Snacks',
    image: '/api/placeholder/200/200',
    description: 'Delicious butter cookies',
    unit: '200 g',
    inStock: false,
    rating: 4.0,
    reviews: 89
  },
  {
    id: '6',
    name: 'Tata Salt',
    price: 22,
    category: 'Spices',
    image: '/api/placeholder/200/200',
    description: 'Pure and hygienic iodized salt',
    unit: '1 kg',
    inStock: true,
    rating: 4.4,
    reviews: 312
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    userId: '1',
    items: [
      { ...mockProducts[0], quantity: 2 },
      { ...mockProducts[1], quantity: 1 }
    ],
    total: 124,
    status: 'delivered',
    orderDate: '2024-08-10',
    deliveryDate: '2024-08-12',
    refundStatus: 'none'
  },
  {
    id: 'ORD002',
    userId: '1',
    items: [
      { ...mockProducts[2], quantity: 1 },
      { ...mockProducts[3], quantity: 2 }
    ],
    total: 250,
    status: 'delivered',
    orderDate: '2024-08-14',
    deliveryDate: '2024-08-16',
    refundStatus: 'none'
  }
];