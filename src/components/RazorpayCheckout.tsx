
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface RazorpayCheckoutProps {
  amount: number; // Amount in paise (INR)
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  orderId?: string;
  onSuccess?: (payment_id: string, order_id: string, signature: string) => void;
  onFailure?: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  amount,
  customerName = '',
  customerEmail = '',
  customerPhone = '',
  orderId = '',
  onSuccess,
  onFailure
}) => {
  const { toast } = useToast();

  const handlePayment = () => {
    // Load the Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      const options = {
        key: 'rzp_test_YOUR_KEY_ID', // Replace with your actual test key in production
        amount: amount, // Amount in paise
        currency: 'INR',
        name: 'CV16',
        description: 'Payment for gaming products',
        image: '/lovable-uploads/3abd5153-0573-4be3-97a5-c72628229259.png',
        order_id: orderId, // For orders created on your server
        handler: function(response: any) {
          // Handle successful payment
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          
          if (onSuccess) {
            onSuccess(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone
        },
        notes: {
          address: "CV16 Headquarters"
        },
        theme: {
          color: "#3B82F6"
        },
        modal: {
          ondismiss: function() {
            toast({
              title: "Payment Cancelled",
              description: "You closed the payment window.",
              variant: "destructive"
            });
          }
        }
      };
      
      try {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        toast({
          title: "Payment Failed",
          description: "There was an issue initiating the payment.",
          variant: "destructive"
        });
        
        if (onFailure) {
          onFailure(error);
        }
      }
    };
    
    script.onerror = () => {
      toast({
        title: "Payment Error",
        description: "Failed to load the payment gateway.",
        variant: "destructive"
      });
      
      if (onFailure) {
        onFailure(new Error("Failed to load Razorpay script"));
      }
    };
    
    document.body.appendChild(script);
  };

  return (
    <Button 
      onClick={handlePayment} 
      className="w-full gap-2" 
      size="lg"
    >
      <CreditCard className="h-4 w-4" />
      Pay with Razorpay
    </Button>
  );
};

export default RazorpayCheckout;
