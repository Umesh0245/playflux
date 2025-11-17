import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/BackButton";
import { useUserStore } from "@/lib/user-store";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import Lightning from "@/components/Lightning";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useUserStore();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup(name, email, password);
      toast({
        title: "Account created!",
        description: "Welcome to PlayFlux",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center p-4 bg-black relative overflow-hidden">
      {/* Lightning Background - Red for Signup */}
      <div className="absolute inset-0 z-0">
        <Lightning
          hue={0}
          xOffset={0}
          speed={1.2}
          intensity={1.5}
          size={1}
        />
      </div>

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
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription className="text-base">
              Join thousands of gamers upgrading their setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
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
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Must be at least 8 characters
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 font-medium shadow-lg shadow-primary/20 gap-2"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-border/50 pt-6">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto font-semibold text-primary hover:text-primary/80" 
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-8 drop-shadow-md">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Signup;
