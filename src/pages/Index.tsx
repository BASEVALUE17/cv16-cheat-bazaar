
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Shield, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CheatCard from '@/components/CheatCard';
import { cheats } from '@/data/cheats';

const Index = () => {
  // Get featured products (first 3)
  const featuredCheats = cheats.slice(0, 3);
  
  // Get latest products (last 3)
  const latestCheats = [...cheats].sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  ).slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <Badge variant="outline" className="mb-4 px-3 py-1">
                Premium Game Enhancements
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Elevate Your <span className="text-primary">Gaming Experience</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
                Discover our premium collection of game enhancements designed to give you the competitive edge you've been looking for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/products">
                  <Button size="lg" className="min-w-[160px]">
                    Browse Products
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="min-w-[160px]">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="relative">
                <div className="bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl p-8 shadow-xl transform hover:scale-[1.01] transition-transform duration-500 ease-out">
                  <img 
                    src="/assets/cheat1.jpg" 
                    alt="Featured product" 
                    className="rounded-lg shadow-lg w-full aspect-video object-cover animate-float"
                  />
                  <div className="mt-6 flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">Ultimate Gaming Bundle</h3>
                      <p className="text-muted-foreground">All-in-one solution for serious gamers</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      20% OFF
                    </Badge>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose CV16</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide premium tools with exceptional support to help you reach your full potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Undetected & Secure</h3>
              <p className="text-muted-foreground">
                Our products use advanced techniques to stay undetected while providing you with a secure gaming experience.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Regular Updates</h3>
              <p className="text-muted-foreground">
                We regularly update our products to ensure compatibility with the latest game versions and to add new features.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Bell className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated support team is available around the clock to assist you with any questions or issues.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="flex items-center text-primary hover:underline gap-1"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCheats.map((cheat) => (
              <CheatCard key={cheat.id} cheat={cheat} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-secondary/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it — hear from the gamers who use our products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-xl p-6 hover-scale">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="h-5 w-5 fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">
                "The aimbot is absolutely flawless. Smooth, precise, and completely undetected. Customer support was also incredibly helpful when I had questions about configuration."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="font-medium">MG</span>
                </div>
                <div>
                  <p className="font-medium">Michael G.</p>
                  <p className="text-sm text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover-scale">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="h-5 w-5 fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">
                "I've tried several ESP solutions from different providers, but this one stands out. The customization options are extensive, and it runs flawlessly without any performance impact."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="font-medium">SJ</span>
                </div>
                <div>
                  <p className="font-medium">Sarah J.</p>
                  <p className="text-sm text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover-scale">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">
                "The radar hack has completely changed the way I play. Being able to see enemy positions and movements gives me a massive advantage. Definitely worth every penny."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="font-medium">TD</span>
                </div>
                <div>
                  <p className="font-medium">Thomas D.</p>
                  <p className="text-sm text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Latest Releases</h2>
            <Link 
              to="/products" 
              className="flex items-center text-primary hover:underline gap-1"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestCheats.map((cheat) => (
              <CheatCard key={cheat.id} cheat={cheat} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Gaming?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Browse our premium collection of game enhancements and take your skills to the next level.
              </p>
              <Link to="/products">
                <Button size="lg" className="min-w-[200px]">
                  Explore Products
                </Button>
              </Link>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
