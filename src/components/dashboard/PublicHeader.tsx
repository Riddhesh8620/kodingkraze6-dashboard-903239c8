import { Search, Menu, Zap, ShoppingCart, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PublicHeader = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const NavLinks = ({ className = "" }: { className?: string }) => (
    <>
      <Link to="/" className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${className}`}>
        Home
      </Link>
      <Link to="/categories" className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${className}`}>
        Categories
      </Link>
      <Link to="/interview" className={`text-sm font-medium text-primary hover:text-primary/80 transition-colors ${className}`}>
        Interview Ready
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass">
      <div className="container flex h-20 items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
              <Zap className="h-5 w-5 text-background" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-display">KodingKraze6</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses..." className="w-full pl-11 rounded-full bg-secondary/50" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
              >
                {itemCount}
              </Badge>
            )}
          </Button>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
            <Button onClick={() => navigate("/?mode=signup")} className="gap-2 rounded-full">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </div>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 fill-current" />
                  KodingKraze6
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-10">
                <NavLinks className="text-lg py-2 border-b border-border/50" />
                
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="outline" onClick={() => navigate("/")} className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                  <Button onClick={() => navigate("/?mode=signup")} className="w-full gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
