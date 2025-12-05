import { TrendingUp, Users, BookOpen, Award } from "lucide-react";

const stats = [
  { 
    icon: Users, 
    value: "50,000+", 
    label: "Active Learners",
    trend: "+12% this month"
  },
  { 
    icon: BookOpen, 
    value: "200+", 
    label: "Premium Courses",
    trend: "New courses weekly"
  },
  { 
    icon: Award, 
    value: "95%", 
    label: "Success Rate",
    trend: "Industry leading"
  },
  { 
    icon: TrendingUp, 
    value: "4.9/5", 
    label: "Average Rating",
    trend: "From 10K+ reviews"
  },
];

const StatsBar = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className="relative overflow-hidden rounded-2xl border border-border bg-background p-6 animate-fade-up group hover:border-foreground/20 transition-colors"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Icon */}
          <stat.icon className="h-5 w-5 text-muted-foreground mb-4 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
          
          {/* Value */}
          <div className="text-2xl md:text-3xl font-bold font-display mb-1">
            {stat.value}
          </div>
          
          {/* Label */}
          <div className="text-sm text-muted-foreground mb-2">
            {stat.label}
          </div>
          
          {/* Trend */}
          <div className="text-xs text-muted-foreground/70">
            {stat.trend}
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsBar;
