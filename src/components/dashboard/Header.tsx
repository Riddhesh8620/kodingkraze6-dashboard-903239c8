import { Search, Bell, User, Menu, Zap, LogOut, Target, Video, PlusCircle, BookPlus, FolderPlus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  
  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Navigation Links shared for both Desktop and Mobile
  const NavLinks = ({ className = "" }: { className?: string }) => (
    <>
      <Link to="/dashboard" className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${className}`}>
        Dashboard
      </Link>
      <Link to="/categories" className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${className}`}>
        Categories
      </Link>
      <Link to="/sessions/book" className={`flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${className}`}>
        <Video className="h-4 w-4" />
        1:1 Sessions
      </Link>
      <Link to="/interview" className={`flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors ${className}`}>
        <Target className="h-4 w-4" />
        Interview Ready
      </Link>
    </>
  );

  // Admin Links for mobile menu
  const AdminLinks = ({ className = "" }: { className?: string }) => (
    <>
      <div className={`pt-4 border-t border-border ${className}`}>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Admin Actions
        </p>
        <Link 
          to="/admin/add-course" 
          className="flex items-center gap-3 text-lg py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <BookPlus className="h-5 w-5" />
          Add Course
        </Link>
        <Link 
          to="/admin/add-topic" 
          className="flex items-center gap-3 text-lg py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <FolderPlus className="h-5 w-5" />
          Add Topics / Questions
        </Link>
      </div>
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

        {/* Desktop Navigation (Hidden on mobile) */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search anything..." className="w-full pl-11 rounded-full bg-secondary/50" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 text-sm">
                <p className="font-medium truncate">{user?.email}</p>
                {isAdmin && (
                  <p className="text-xs text-primary font-medium mt-1">Administrator</p>
                )}
              </div>
              <DropdownMenuSeparator />
              {isAdmin && (
                <>
                  <DropdownMenuItem onClick={() => navigate("/admin/add-course")} className="cursor-pointer">
                    <BookPlus className="mr-2 h-4 w-4" /> Add Course
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/admin/add-topic")} className="cursor-pointer">
                    <FolderPlus className="mr-2 h-4 w-4" /> Add Topics / Questions
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* MOBILE MENU (SHEET) */}
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
                {/* We reuse our NavLinks but style them for a vertical stack */}
                <NavLinks className="text-lg py-2 border-b border-border/50" />
                
                {/* Admin Links */}
                {isAdmin && <AdminLinks />}
                
                <Button className="w-full mt-4" onClick={() => navigate('/sessions/book')}>
                  Book a Session
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;