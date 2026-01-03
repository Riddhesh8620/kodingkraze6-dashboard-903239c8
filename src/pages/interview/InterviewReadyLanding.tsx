import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Brain, Code, Zap, Target, Clock, Shield } from "lucide-react";

const InterviewReadyLanding = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Aptitude Tests",
      description: "Sharpen your logical reasoning and quantitative skills",
    },
    {
      icon: Code,
      title: "DSA Challenges",
      description: "Master data structures and algorithms concepts",
    },
    {
      icon: Target,
      title: "Mixed Mode",
      description: "Comprehensive test covering all topics",
    },
  ];

  const highlights = [
    { icon: Clock, text: "Timed assessments with real interview pressure" },
    { icon: Shield, text: "Tab-switch detection for authentic testing" },
    { icon: Zap, text: "Instant results with detailed explanations" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container py-4">
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 gradient-accent" />
        
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Zap className="h-4 w-4" />
              Test Your Interview Skills
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Are You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Interview Ready?
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Challenge yourself with curated aptitude and DSA questions. 
              Get real-time feedback and know exactly where you stand.
            </p>
            
            <Button 
              size="lg" 
              onClick={() => navigate("/interview/preferences")}
              className="group px-8 py-6 text-lg rounded-full"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Choose Your Challenge</h2>
          <p className="text-muted-foreground">Select from three different test modes</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="container py-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-foreground text-background p-10 md:p-14">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-8 text-center">
              Real Interview Conditions
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-background/10 flex items-center justify-center mb-4">
                    <highlight.icon className="h-6 w-6" />
                  </div>
                  <p className="text-background/80">{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterviewReadyLanding;
