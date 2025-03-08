
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cheat } from '@/types';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, ShoppingCart } from 'lucide-react';
import { convertToINR, formatINR } from '@/utils/currency';

interface CheatCardProps {
  cheat: Cheat;
}

const CheatCard = ({ cheat }: CheatCardProps) => {
  const { addToCart } = useCart();
  
  // Calculate discounted price if applicable
  const discountedPrice = cheat.discountPercentage 
    ? cheat.price * (1 - cheat.discountPercentage / 100) 
    : null;
    
  // Convert prices to INR
  const priceInINR = convertToINR(cheat.price);
  const discountedPriceInINR = discountedPrice ? convertToINR(discountedPrice) : null;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <Link to={`/product/${cheat.id}`}>
          <img 
            src={cheat.imageUrl} 
            alt={cheat.title} 
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
        {cheat.discountPercentage && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            {cheat.discountPercentage}% OFF
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link 
            to={`/product/${cheat.id}`}
            className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1"
          >
            {cheat.title}
          </Link>
        </div>
        
        <Badge variant="outline" className="mb-2">
          {cheat.game}
        </Badge>
        
        <p className="text-muted-foreground line-clamp-2 mb-3 text-sm">
          {cheat.description}
        </p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span>Updated: {cheat.lastUpdate}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {cheat.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {cheat.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{cheat.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          {discountedPriceInINR ? (
            <div className="flex flex-col">
              <span className="font-bold">{formatINR(discountedPriceInINR)}</span>
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(priceInINR)}
              </span>
            </div>
          ) : (
            <span className="font-bold">{formatINR(priceInINR)}</span>
          )}
        </div>
        
        <Button 
          size="sm" 
          onClick={() => addToCart(cheat)}
          className="flex items-center gap-1"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CheatCard;
