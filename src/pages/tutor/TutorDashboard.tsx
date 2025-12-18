import { Outlet } from 'react-router-dom';
import TutorSidebar from '@/components/tutor/TutorSidebar';
import TutorHeader from '@/components/tutor/TutorHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function TutorDashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <TutorSidebar />
        <div className="flex-1 flex flex-col">
          <TutorHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
