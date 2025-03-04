
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, GitHub, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-primary-foreground font-bold text-xl">CV</span>
              </div>
              <span className="font-bold text-xl">CV16</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Premium game enhancements for the competitive player. Gain the edge with our state-of-the-art solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <GitHub size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/faq" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/refund" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                <span>support@cv16cheats.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} CV16. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link 
              to="/cookies" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
