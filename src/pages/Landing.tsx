import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicHeader from "@/components/dashboard/PublicHeader";
import Categories from "@/components/dashboard/Categories";
import CourseBrochure from "@/components/dashboard/CourseBrochure";
import AuthPromptDialog from "@/components/AuthPromptDialog";
import { ArrowRight, Zap, BookOpen, Users, Award, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/?mode=signup");
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="container py-12 space-y-20">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20">
          <div className="absolute inset-0 pattern-grid opacity-30" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Play className="h-4 w-4" />
              Start Learning Today
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
              Master Coding Skills with{" "}
              <span className="text-primary">KodingKraze6</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From aptitude to advanced tech skills, explore curated courses designed 
              to accelerate your career. Learn at your own pace with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="rounded-full px-8 gap-2"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/categories")}
                className="rounded-full px-8"
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, value: "50+", label: "Courses" },
            { icon: Users, value: "10k+", label: "Students" },
            { icon: Award, value: "95%", label: "Success Rate" },
            { icon: Zap, value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-card border">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold font-display">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Categories Section */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Browse</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-2">Categories</h2>
            </div>
            <Link to="/categories" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all link-underline">
              View all categories
              <ArrowRight className="h-4 w-4" />
            </Link>
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
            <Link to="/categories" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all link-underline">
              Browse all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
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
              Join thousands of learners who have transformed their careers with KodingKraze6. 
              No commitments, just results.
            </p>
            <button 
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
            >
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
                <span className="font-display font-bold">KodingKraze6</span>
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

      <AuthPromptDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
      />
    </div>
  );
};

export default Landing;
