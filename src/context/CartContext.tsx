
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Cheat, CartItem } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (cheat: Cheat) => void;
  removeFromCart: (cheatId: string) => void;
  clearCart: () => void;
  updateQuantity: (cheatId: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate totals
    setTotalItems(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(
      cartItems.reduce((acc, item) => {
        const price = item.cheat.discountPercentage 
          ? item.cheat.price * (1 - item.cheat.discountPercentage / 100) 
          : item.cheat.price;
        return acc + (price * item.quantity);
      }, 0)
    );
  }, [cartItems]);

  const addToCart = (cheat: Cheat) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.cheat.id === cheat.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        const updatedItems = prevItems.map((item) => 
          item.cheat.id === cheat.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        toast({
          title: "Item quantity increased",
          description: `${cheat.title} quantity updated in your cart.`,
        });
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Item added to cart",
          description: `${cheat.title} has been added to your cart.`,
        });
        return [...prevItems, { cheat, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (cheatId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.cheat.id === cheatId);
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.cheat.title} has been removed from your cart.`,
        });
      }
      return prevItems.filter((item) => item.cheat.id !== cheatId);
    });
  };

  const updateQuantity = (cheatId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cheatId);
      return;
    }
    
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.cheat.id === cheatId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
