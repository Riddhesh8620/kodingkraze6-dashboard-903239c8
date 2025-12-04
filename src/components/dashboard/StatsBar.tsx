import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Total Courses", value: "150+", color: "hsl(217, 91%, 60%)" },
  { icon: Users, label: "Active Learners", value: "45K+", color: "hsl(262, 83%, 58%)" },
  { icon: Award, label: "Certificates Issued", value: "12K+", color: "hsl(142, 71%, 45%)" },
  { icon: TrendingUp, label: "Completion Rate", value: "94%", color: "hsl(340, 82%, 52%)" },
];

const StatsBar = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className="relative overflow-hidden rounded-xl border border-border bg-card p-6 animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div 
            className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10"
            style={{ backgroundColor: stat.color }}
          />
          
          <div 
            className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
          >
            <stat.icon className="h-5 w-5" />
          </div>
          
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsBar;
