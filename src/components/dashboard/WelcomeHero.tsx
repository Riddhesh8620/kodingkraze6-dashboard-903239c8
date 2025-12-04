import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WelcomeHero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl gradient-card border border-border p-8 md:p-12">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-category-mobile/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 animate-fade-up">
          <Sparkles className="h-4 w-4" />
          Pay As You Go Learning
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Master coding skills,{" "}
          <span className="text-gradient">one course at a time</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          No subscriptions. No commitments. Just pay for what you learn. 
          Access premium courses from industry experts and build real-world projects.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="gradient-primary border-0 shadow-soft hover:shadow-glow transition-all group">
            Explore Courses
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
