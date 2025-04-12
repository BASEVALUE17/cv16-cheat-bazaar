
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { LogIn, User, Mail, Lock, AlertCircle, Github, Cpu } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - in real app would connect to authentication service
    setTimeout(() => {
      // Simple validation for demo purposes
      if (email === 'admin@example.com' && password === 'password') {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        // Store login state in localStorage for demo purposes
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ email, name: 'Admin User' }));
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Try admin@example.com / password",
          icon: <AlertCircle className="h-5 w-5" />
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google login - in real app would integrate Google OAuth
    setTimeout(() => {
      toast({
        title: "Google login successful",
        description: "Welcome back!",
      });
      // Store login state in localStorage for demo purposes
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({ email: 'google@example.com', name: 'Google User' }));
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-secondary/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Cpu className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome to CV16</CardTitle>
          <CardDescription className="text-center">
            Login to access your CV16 Cheat Bazaar account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@example.com" 
                  className="pl-10" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="password" 
                  className="pl-10" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>Sign in <LogIn className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>

          <div className="flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.66 15.63 16.89 16.795 15.72 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
              <path d="M12 23C14.97 23 17.46 22.015 19.28 20.335L15.72 17.575C14.73 18.225 13.48 18.625 12 18.625C9.19 18.625 6.8 16.69 5.96 14.1H2.27V16.95C4.08 20.505 7.77 23 12 23Z" fill="#34A853" />
              <path d="M5.96 14.1C5.76 13.5 5.65 12.865 5.65 12.215C5.65 11.565 5.76 10.93 5.96 10.33V7.48H2.27C1.53 9.28 1.1 11.245 1.1 13.265C1.1 15.285 1.53 17.25 2.27 19.05L5.96 14.1Z" fill="#FBBC05" />
              <path d="M12 5.805C13.62 5.805 15.06 6.355 16.21 7.455L19.36 4.305C17.46 2.555 14.97 1.5 12 1.5C7.77 1.5 4.08 3.995 2.27 7.55L5.96 10.4C6.8 7.81 9.19 5.805 12 5.805Z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
