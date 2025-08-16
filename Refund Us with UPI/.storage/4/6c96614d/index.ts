export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  description: string;
  unit: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  refundStatus?: 'none' | 'requested' | 'approved' | 'completed';
  refundAmount?: number;
  refundMethod?: 'wallet' | 'bank';
}

export interface RefundRequest {
  orderId: string;
  amount: number;
  method: 'wallet' | 'bank';
  reason: string;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
}