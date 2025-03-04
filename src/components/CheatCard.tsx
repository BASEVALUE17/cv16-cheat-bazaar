
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cheat } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CheatCardProps {
  cheat: Cheat;
  featured?: boolean;
}

const CheatCard: React.FC<CheatCardProps> = ({ cheat, featured = false }) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate discounted price if applicable
  const discountedPrice = cheat.discountPercentage 
    ? cheat.price * (1 - cheat.discountPercentage / 100) 
    : null;
  
  return (
    <div 
      className={`cheat-item bg-card border ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        {/* Discount Badge */}
        {cheat.discountPercentage && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-primary text-primary-foreground">
              {cheat.discountPercentage}% OFF
            </Badge>
          </div>
        )}
        
        {/* Game Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
            {cheat.game}
          </Badge>
        </div>
        
        {/* Image with loading effect */}
        <div 
          className={`blur-load ${imageLoaded ? 'loaded' : ''}`} 
          style={{ backgroundImage: `url(${cheat.imageUrl})` }}
        >
          <Link to={`/product/${cheat.id}`}>
            <img
              src={cheat.imageUrl}
              alt={cheat.title}
              className="cheat-item-image"
              onLoad={() => setImageLoaded(true)}
            />
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${cheat.id}`} className="group">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
              {cheat.title}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{cheat.rating}</span>
            <span className="text-muted-foreground">({cheat.totalReviews})</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {cheat.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cheat.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  ${cheat.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">${cheat.price.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => addToCart(cheat)}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheatCard;
