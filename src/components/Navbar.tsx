
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X,
  LogIn,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoVisible, setLogoVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Logo animation effect
  useEffect(() => {
    const animateLogo = setInterval(() => {
      setLogoVisible(false);
      setTimeout(() => setLogoVisible(true), 500);
    }, 5000);
    
    return () => clearInterval(animateLogo);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
      // TODO: Implement search functionality
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/3abd5153-0573-4be3-97a5-c72628229259.png" 
              alt="CV16" 
              className={`h-10 transition-all duration-500 ${
                logoVisible 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-90 rotate-12'
              }`}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/about" className="font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-40 lg:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
              >
                <Search size={18} />
              </Button>
            </form>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <User size={16} />
                    <span className="max-w-[100px] truncate">{user?.name || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <LogIn size={16} />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-3 md:hidden">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t pt-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0"
                >
                  <Search size={18} />
                </Button>
              </form>
            </div>
            {isAuthenticated ? (
              <Button 
                variant="destructive" 
                className="flex items-center justify-center gap-2"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </Button>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 py-2 px-4 bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
