'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react';
import { CartItem, Product } from '@/lib/types';
import { useToast } from './use-toast';
import { useFirebase, useUser, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

type CartState = {
  items: CartItem[];
  isCartLoaded: boolean;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: { items: CartItem[] } };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  itemCount: number;
  totalPrice: number;
  isCartLoaded: boolean;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload.items, isCartLoaded: true };
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity,
        };
        newItems = [...state.items, newItem];
      }
      return { ...state, items: newItems };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.productId),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const localCart = window.localStorage.getItem('cart');
    return localCart ? JSON.parse(localCart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage', error);
    return [];
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: getCartFromLocalStorage(), isCartLoaded: false });
  const { user } = useUser();
  const { firestore } = useFirebase();

  const cartDocRef = useMemoFirebase(() => {
    if (user && firestore) {
      return doc(firestore, 'users', user.uid, 'carts', 'active');
    }
    return null;
  }, [user, firestore]);

  // Load from Firestore
  useEffect(() => {
    if (cartDocRef) {
      getDoc(cartDocRef).then(docSnap => {
        if (docSnap.exists()) {
          dispatch({ type: 'SET_CART', payload: { items: docSnap.data().items || [] } });
        } else {
          // No cart in firestore, maybe local storage has one from anonymous session
           const localCartItems = getCartFromLocalStorage();
           if(localCartItems.length > 0) {
              dispatch({ type: 'SET_CART', payload: { items: localCartItems } });
           } else {
             dispatch({ type: 'SET_CART', payload: { items: [] } });
           }
        }
      });
    } else {
        // Not logged in, use local storage
        dispatch({ type: 'SET_CART', payload: { items: getCartFromLocalStorage() } });
    }
  }, [cartDocRef]);


  // Persist to Firestore or LocalStorage
  useEffect(() => {
    if (!state.isCartLoaded) return; // Don't persist until initial cart is loaded

    if (cartDocRef) {
      setDocumentNonBlocking(cartDocRef, { items: state.items }, { merge: true });
    } else {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cart', JSON.stringify(state.items));
      }
    }
  }, [state.items, cartDocRef, state.isCartLoaded]);


  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, itemCount, totalPrice, isCartLoaded: state.isCartLoaded }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  const { toast } = useToast();

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  const { state, dispatch, itemCount, totalPrice, isCartLoaded } = context;

  const addItem = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    isCartLoaded
  };
};
