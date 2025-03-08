
import React from 'react';
import { Shield, Zap, Trophy, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About CV16</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're passionate gamers who believe in providing top-tier gaming enhancement solutions to elevate your gaming experience.
        </p>
      </div>
      
      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg mb-4">
            Founded in 2020, CV16 began with a simple mission: to create tools that help gamers unlock their full potential.
          </p>
          <p className="text-lg mb-4">
            What started as a small team of passionate developers has grown into a trusted name in the gaming enhancement industry, serving thousands of satisfied customers worldwide.
          </p>
          <p className="text-lg">
            Our team consists of experienced game developers, cybersecurity experts, and passionate gamers who understand what makes a truly effective gaming solution.
          </p>
        </div>
        <div className="bg-card border rounded-xl overflow-hidden">
          <img
            src="/lovable-uploads/582c012f-76b8-4f11-92fe-af77fd1151c4.png"
            alt="CV16 Team"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border rounded-xl p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Security</h3>
            <p className="text-muted-foreground">
              We prioritize your account safety with undetectable solutions designed to protect your gaming identity.
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance</h3>
            <p className="text-muted-foreground">
              Our tools are optimized for maximum performance with minimal impact on your system resources.
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We constantly push the boundaries with cutting-edge features that keep you ahead of the competition.
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-muted-foreground">
              Every product is rigorously tested to ensure a seamless experience from installation to gameplay.
            </p>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">Are your products safe to use?</h3>
            <p className="text-muted-foreground">
              Yes, we prioritize security in all our products. Our solutions are designed to be undetectable and secure, with regular updates to maintain compatibility and safety.
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">How do I receive updates?</h3>
            <p className="text-muted-foreground">
              All updates are provided automatically through our secure update system. You'll always have access to the latest version of your purchased products.
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">Do you offer refunds?</h3>
            <p className="text-muted-foreground">
              We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, please contact our support team for assistance.
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">How can I get help with installation?</h3>
            <p className="text-muted-foreground">
              Each product comes with detailed installation instructions. If you need additional help, our support team is available 24/7 to assist you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
