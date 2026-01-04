import { Search, Bell, User, Menu, Zap, LogOut, Target, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass">
      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
            <Zap className="h-5 w-5 text-background" fill="currentColor" />
            <div className="absolute -inset-1 rounded-xl bg-foreground/20 blur-lg -z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight font-display">
              KodingKraze6
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Learn • Build • Grow
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
          >
            Dashboard
          </Link>
          <Link
            to="/categories"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
          >
            Categories
          </Link>
          <Link
            to="/sessions/book"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
          >
            <Video className="h-4 w-4" />
            1:1 Sessions
          </Link>
          <Link
            to="/interview"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Target className="h-4 w-4" />
            Interview Ready
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <Input
              placeholder="Search anything..."
              className="w-full pl-11 pr-4 h-11 bg-secondary/50 border-0 rounded-full focus-visible:ring-2 focus-visible:ring-foreground/10 focus-visible:bg-secondary transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full gradient-accent" />
          </Button>
          
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Learner</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
