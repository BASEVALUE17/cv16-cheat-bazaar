
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingCart,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto bg-card border rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Items ({totalItems})
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>
              
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const itemPrice = item.cheat.discountPercentage 
                    ? item.cheat.price * (1 - item.cheat.discountPercentage / 100) 
                    : item.cheat.price;
                  
                  return (
                    <div key={item.cheat.id}>
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        {/* Product Image */}
                        <Link to={`/product/${item.cheat.id}`} className="shrink-0">
                          <img 
                            src={item.cheat.imageUrl} 
                            alt={item.cheat.title} 
                            className="w-full sm:w-20 h-20 object-cover rounded-md"
                          />
                        </Link>
                        
                        {/* Product Info */}
                        <div className="flex-1">
                          <Link 
                            to={`/product/${item.cheat.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.cheat.title}
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.cheat.game}
                          </p>
                          
                          {/* Price */}
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              ${itemPrice.toFixed(2)}
                            </span>
                            {item.cheat.discountPercentage && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.cheat.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Quantity and Remove */}
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                          <div className="flex items-center border rounded-md">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.cheat.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.cheat.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.cheat.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Link to="/products">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-card border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>$0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full flex items-center justify-center gap-2">
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <div className="mt-6 bg-secondary p-4 rounded-md">
              <p className="text-sm text-center text-muted-foreground">
                Secure payments processed with industry-standard encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
