import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/BackButton";
import { useUserStore } from "@/lib/user-store";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, ArrowRight } from "lucide-react";
import LaserFlow from "@/components/LaserFlow";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    toast({
      title: "Login successful!",
      description: "Welcome back to PlayFlux",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center p-4 bg-black relative overflow-hidden">
      {/* LaserFlow Background - Simple, highly visible */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full z-0"
        style={{ 
          opacity: 1
        }}
      >
        <LaserFlow
          horizontalBeamOffset={0.8}
          verticalBeamOffset={0.2}
          color="#00FFFF"
          fogIntensity={5.0}
          wispIntensity={80.0}
          verticalSizing={10.0}
          horizontalSizing={5.0}
          flowSpeed={2.0}
          wispSpeed={3.0}
        />
      </div>

      {/* Gradient overlay from left for form readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-[1]" />

      {/* Left-aligned container */}
      <div className="w-full max-w-md relative z-10 ml-8 md:ml-20">
        <BackButton className="mb-6" />
        
        {/* Logo Section */}
        <div className="text-left mb-8">
          <h1 
            className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2 cursor-pointer drop-shadow-lg"
            onClick={() => navigate("/")}
          >
            PLAYFLUX
          </h1>
          <p className="text-gray-300 text-sm drop-shadow-md">Pro-grade gaming gear marketplace</p>
        </div>

        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs text-muted-foreground hover:text-primary"
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 font-medium shadow-lg shadow-primary/20 gap-2"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-border/50 pt-6">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto font-semibold text-primary hover:text-primary/80" 
                onClick={() => navigate("/signup")}
              >
                Create account
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-8 drop-shadow-md">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
