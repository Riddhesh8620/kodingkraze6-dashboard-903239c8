import { LucideIcon, ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  courseCount: number;
  color: string;
  delay?: number;
}

const CategoryCard = ({ icon: Icon, title, courseCount, color, delay = 0 }: CategoryCardProps) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-background border border-border p-6 card-hover cursor-pointer animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Hover gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color}10 0%, transparent 60%)` }}
      />
      
      {/* Icon container */}
      <div 
        className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ backgroundColor: `${color}12`, color }}
      >
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      
      {/* Content */}
      <div className="relative">
        <h3 className="font-display font-semibold text-lg mb-1 flex items-center gap-2">
          {title}
          <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
        </h3>
        <p className="text-sm text-muted-foreground">{courseCount} courses available</p>
      </div>
      
      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default CategoryCard;
