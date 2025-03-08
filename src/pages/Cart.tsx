import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash, 
  ShoppingCart, 
  ChevronLeft, 
  AlertCircle,
  MinusCircle,
  PlusCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { convertToINR, formatINR } from '@/utils/currency';
import RazorpayCheckout from '@/components/RazorpayCheckout';
import { CreditCard } from 'lucide-react';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    totalPrice
  } = useCart();
  
  // Convert total price to INR
  const totalPriceInINR = convertToINR(totalPrice);
  
  // Calculate shipping and tax
  const shippingFee = 0; // Free shipping
  const taxRate = 0.18; // 18% GST
  const taxAmount = totalPriceInINR * taxRate;
  const finalTotal = totalPriceInINR + taxAmount + shippingFee;
  
  // Handle successful payment
  const handlePaymentSuccess = (payment_id: string, order_id: string, signature: string) => {
    console.log('Payment successful:', { payment_id, order_id, signature });
    clearCart();
    // In a real app, you would redirect to an order confirmation page
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <span>Cart Items ({cartItems.length})</span>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Clear Cart
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => {
                    // Calculate item price in INR
                    const regularPriceInINR = convertToINR(item.cheat.price);
                    const priceInINR = item.cheat.discountPercentage 
                      ? convertToINR(item.cheat.price * (1 - item.cheat.discountPercentage / 100))
                      : regularPriceInINR;
                    
                    return (
                      <TableRow key={item.cheat.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Link to={`/product/${item.cheat.id}`} className="w-16 h-16 rounded overflow-hidden">
                              <img 
                                src={item.cheat.imageUrl} 
                                alt={item.cheat.title} 
                                className="w-full h-full object-cover"
                              />
                            </Link>
                            <div>
                              <Link 
                                to={`/product/${item.cheat.id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {item.cheat.title}
                              </Link>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {item.cheat.game}
                                </Badge>
                                {item.cheat.discountPercentage && (
                                  <Badge className="ml-2 text-xs bg-red-500 hover:bg-red-600">
                                    {item.cheat.discountPercentage}% OFF
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.cheat.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.cheat.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {item.cheat.discountPercentage ? (
                            <div>
                              <div>{formatINR(priceInINR * item.quantity)}</div>
                              <div className="text-xs text-muted-foreground line-through">
                                {formatINR(regularPriceInINR * item.quantity)}
                              </div>
                            </div>
                          ) : (
                            formatINR(priceInINR * item.quantity)
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.cheat.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="w-full flex justify-between">
                <Link to="/products">
                  <Button variant="outline" className="gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatINR(totalPriceInINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : formatINR(shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18% GST)</span>
                  <span>{formatINR(taxAmount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatINR(finalTotal)}</span>
                </div>
                
                <Alert variant="default" className="bg-primary/10 border-primary text-primary">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    All purchases include lifetime updates and 24/7 support.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex flex-col space-y-4">
              <RazorpayCheckout 
                amount={Math.round(finalTotal * 100)} // Converting to paise
                onSuccess={handlePaymentSuccess}
              />
              <div className="text-xs text-center text-muted-foreground">
                By proceeding, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
