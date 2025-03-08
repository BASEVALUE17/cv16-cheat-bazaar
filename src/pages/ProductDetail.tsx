
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Calendar, 
  RotateCw,
  Play,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { cheats } from '@/data/cheats';
import { Cheat } from '@/types';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { convertToINR, formatINR } from '@/utils/currency';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [cheat, setCheat] = useState<Cheat | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { addToCart } = useCart();
  
  // Find the cheat by ID
  useEffect(() => {
    const foundCheat = cheats.find(c => c.id === id);
    if (foundCheat) {
      setCheat(foundCheat);
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!cheat) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button>View All Products</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Calculate discounted price if applicable
  const discountedPrice = cheat.discountPercentage 
    ? cheat.price * (1 - cheat.discountPercentage / 100) 
    : null;
    
  // Convert prices to INR
  const priceInINR = convertToINR(cheat.price);
  const discountedPriceInINR = discountedPrice ? convertToINR(discountedPrice) : null;
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image & Video Section */}
        <div className="bg-card rounded-xl border overflow-hidden relative">
          <img 
            src={cheat.imageUrl} 
            alt={cheat.title} 
            className="w-full aspect-video object-cover"
          />
          
          {cheat.videoUrl && (
            <Button 
              variant="default"
              className="absolute bottom-4 right-4 flex items-center gap-2"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="h-4 w-4" />
              Watch Video
            </Button>
          )}
          
          {/* Video Dialog */}
          {cheat.videoUrl && (
            <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
                <div className="relative aspect-video">
                  <iframe
                    src={cheat.videoUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <DialogClose className="absolute top-2 right-2 z-10">
                    <Button variant="ghost" size="icon" className="text-white bg-black/50 hover:bg-black/70">
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold">{cheat.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-sm">
                  {cheat.game}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{cheat.rating}</span>
                  <span className="text-muted-foreground">({cheat.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="my-6">
            <p className="text-muted-foreground">{cheat.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Release Date</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{cheat.releaseDate}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Last Update</span>
              <div className="flex items-center gap-1">
                <RotateCw className="h-4 w-4 text-muted-foreground" />
                <span>{cheat.lastUpdate}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex flex-col">
              {discountedPriceInINR ? (
                <>
                  <span className="text-3xl font-bold">{formatINR(discountedPriceInINR)}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">
                      {formatINR(priceInINR)}
                    </span>
                    <Badge variant="default" className="text-xs">
                      {cheat.discountPercentage}% OFF
                    </Badge>
                  </div>
                </>
              ) : (
                <span className="text-3xl font-bold">{formatINR(priceInINR)}</span>
              )}
            </div>
            
            <Button 
              size="lg" 
              className="flex items-center gap-2"
              onClick={() => addToCart(cheat)}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
          
          <div className="bg-muted p-4 rounded-lg flex items-center gap-3 mb-6">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium">Secure Purchase</p>
              <p className="text-sm text-muted-foreground">30-day satisfaction guarantee</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {cheat.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features" className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-3">
            {cheat.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        
        <TabsContent value="compatibility" className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Compatibility</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Supported Operating Systems</h3>
              <div className="flex flex-wrap gap-2">
                {cheat.compatibility.map((os, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {os}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Game Version</h3>
              <p>Compatible with the latest version of {cheat.game}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">System Requirements</h3>
              <p>Standard system requirements for running {cheat.game}</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= Math.round(cheat.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <span className="font-medium">{cheat.rating}</span>
              <span className="text-muted-foreground">({cheat.totalReviews})</span>
            </div>
          </div>
          
          {/* Sample Reviews */}
          <div className="space-y-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                    <span className="font-medium">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
              </div>
              <p>This is exactly what I needed! The features work perfectly and the customer support is excellent.</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                    <span className="font-medium">AS</span>
                  </div>
                  <div>
                    <p className="font-medium">Alice Smith</p>
                    <p className="text-sm text-muted-foreground">1 month ago</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
              </div>
              <p>Very good product, but took me some time to configure it properly. Once set up, it works great!</p>
            </div>
            
            <Button variant="outline" className="w-full">Load More Reviews</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
