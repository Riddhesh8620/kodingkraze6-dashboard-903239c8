import Header from "@/components/dashboard/Header";
import WelcomeHero from "@/components/dashboard/WelcomeHero";
import StatsBar from "@/components/dashboard/StatsBar";
import Categories from "@/components/dashboard/Categories";
import CourseBrochure from "@/components/dashboard/CourseBrochure";
import { ArrowRight, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 space-y-20">
        <WelcomeHero />
        <StatsBar />
        
        {/* Categories Section */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Browse</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-2">Categories</h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all link-underline">
              View all categories
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <Categories />
        </section>
        
        {/* Courses Section */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Featured</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-2">Popular Courses</h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all link-underline">
              Browse all courses
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <CourseBrochure />
        </section>
        
        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-3xl bg-foreground text-background p-12 md:p-20">
          <div className="absolute inset-0 pattern-grid opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 gradient-accent" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Ready to start your coding journey?
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Join thousands of learners who have transformed their careers with KodingKRaze6. 
              No commitments, just results.
            </p>
            <button className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="pt-12 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
                <Zap className="h-5 w-5 text-background" fill="currentColor" />
              </div>
              <div>
                <span className="font-display font-bold">KodingKRaze6</span>
                <span className="text-muted-foreground ml-2">© 2024</span>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              {["Terms", "Privacy", "Support", "Contact"].map((link) => (
                <a key={link} href="#" className="hover:text-foreground transition-colors link-underline">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
