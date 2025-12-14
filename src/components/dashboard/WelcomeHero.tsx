import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const WelcomeHero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-secondary/30 p-8 md:p-16 pattern-dots">
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-30 gradient-accent" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 opacity-20" style={{ background: 'hsla(200, 78%, 66%, 1.00)' }} />

      {/* Geometric shapes */}
      <div className="absolute bottom-20 right-40 w-32 h-32 border-2 border-foreground/5 rotate-45 hidden lg:block" />
      <div className="absolute top-20 right-20 w-20 h-20 border-2 border-foreground/10 rounded-full hidden lg:block">

        {/* Small bouncing dot */}
        <div className="absolute w-4 h-4 bg-foreground rounded-full animate-bounceInside" />
      </div>

      <div className="absolute top-20 right-20 w-20 h-20 border-2 border-foreground/10 rounded-full hidden lg:block">

        {/* Dot rolling inside */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-foreground rounded-full 
                  animate-rollInside origin-center" />
      </div>


      {/* <div className="absolute top-20 right-20 w-20 h-20 border-2 border-foreground/10 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute top-40 right-60 w-4 h-4 bg-foreground rounded-full hidden lg:block" />
       */}
      <div className="relative z-10 max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/80 backdrop-blur-sm px-4 py-2 text-sm font-medium mb-8 animate-fade-up">
          <Sparkles className="h-4 w-4 text-accent" />
          <span>No subscriptions.Pay as you Learn .</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up font-display" style={{ animationDelay: "0.1s" }}>
          Learn to code.
          <br />
          <span className="text-gradient">Build anything.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Premium courses from experts. Real-world projects.
          Your pace, your path. Start learning today.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="btn-primary rounded-full px-8 h-14 text-base group">
            Explore Courses
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-foreground/20 hover:bg-foreground hover:text-background transition-all group">
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" />
            Watch Demo
          </Button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 md:gap-12 mt-12 pt-8 border-t border-foreground/10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "50K+", label: "Students" },
            { value: "200+", label: "Courses" },
            { value: "4.9", label: "Avg Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold font-display">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
