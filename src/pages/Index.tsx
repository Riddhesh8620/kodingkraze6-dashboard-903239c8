import Header from "@/components/dashboard/Header";
import WelcomeHero from "@/components/dashboard/WelcomeHero";
import StatsBar from "@/components/dashboard/StatsBar";
import Categories from "@/components/dashboard/Categories";
import CourseBrochure from "@/components/dashboard/CourseBrochure";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-12">
        <WelcomeHero />
        <StatsBar />
        <Categories />
        <CourseBrochure />
        
        {/* Footer */}
        <footer className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded gradient-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">K</span>
              </div>
              <span className="font-semibold text-foreground">KodingKRaze6</span>
              <span>© 2024</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
