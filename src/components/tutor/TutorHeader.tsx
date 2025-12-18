import { Bell, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function TutorHeader() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/auth/tutor';
  };

  const getInitials = (name?: string) => {
    if (!name) return 'T';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8">
          <Menu className="h-4 w-4" />
        </SidebarTrigger>
        <h1 className="text-lg font-semibold font-display">Tutor Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback 
                  className="text-white text-sm"
                  style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)' }}
                >
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:block">{user?.name || 'Tutor'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
