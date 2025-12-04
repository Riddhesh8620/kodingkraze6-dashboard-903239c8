import { LucideIcon } from "lucide-react";

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
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 card-hover cursor-pointer animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}08 0%, transparent 50%)` }}
      />
      
      <div 
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}15`, color }}
      >
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{courseCount} courses</p>
      
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default CategoryCard;
