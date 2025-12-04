import { Clock, Users, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  title: string;
  instructor: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  category: string;
  categoryColor: string;
  featured?: boolean;
  delay?: number;
}

const CourseCard = ({
  title,
  instructor,
  image,
  price,
  originalPrice,
  rating,
  students,
  duration,
  category,
  categoryColor,
  featured = false,
  delay = 0,
}: CourseCardProps) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl border border-border bg-card card-hover animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="gradient-primary border-0 text-primary-foreground">
            Featured
          </Badge>
        </div>
      )}
      
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
            <Play className="h-6 w-6 text-primary ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <Badge 
          variant="secondary" 
          className="mb-3 font-medium"
          style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
        >
          {category}
        </Badge>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">by {instructor}</p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
            )}
          </div>
          <Button size="sm" className="gradient-primary border-0 shadow-soft hover:shadow-glow transition-shadow">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
