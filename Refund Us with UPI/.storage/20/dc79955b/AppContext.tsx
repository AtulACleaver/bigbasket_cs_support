import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, User, Order, Product } from '@/types';
import { mockUser, mockOrders, mockProducts } from '@/lib/mockData';

interface AppState {
  user: User;
  cart: CartItem[];
  orders: Order[];
  products: Product[];
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'UPDATE_WALLET'; payload: number }
  | { type: 'UPDATE_ORDER_REFUND'; payload: { orderId: string; refundStatus: string; refundAmount?: number; refundMethod?: string } };

const initialState: AppState = {
  user: mockUser,
  cart: [],
  orders: mockOrders,
  products: mockProducts
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cart: []
      };

    case 'UPDATE_WALLET':
      return {
        ...state,
        user: {
          ...state.user,
          walletBalance: state.user.walletBalance + action.payload
        }
      };

    case 'UPDATE_ORDER_REFUND':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? {
                ...order,
                refundStatus: action.payload.refundStatus as any,
                refundAmount: action.payload.refundAmount,
                refundMethod: action.payload.refundMethod as any
              }
            : order
        )
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}