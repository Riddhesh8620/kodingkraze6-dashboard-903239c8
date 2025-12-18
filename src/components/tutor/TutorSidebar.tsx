import { BookOpen, Users, BarChart3, CreditCard, GraduationCap } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'My Courses', url: '/tutor', icon: BookOpen },
  { title: 'Students', url: '/tutor/students', icon: Users },
  { title: 'Analytics', url: '/tutor/analytics', icon: BarChart3 },
  { title: 'Earnings', url: '/tutor/earnings', icon: CreditCard },
];

export default function TutorSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)' }}
          >
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm font-display">KodingKraze6</span>
              <span className="text-xs text-muted-foreground">Tutor Portal</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url || 
                  (item.url === '/tutor' && location.pathname === '/tutor');
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
