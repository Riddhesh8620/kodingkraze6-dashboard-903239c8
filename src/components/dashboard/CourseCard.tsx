import { Clock, Users, Star, Play, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id?: string;
  title: string;
  instructor?: string;
  image: string;
  price?: number;
  discountedPrice?: number;
  originalPrice?: number;
  rating?: number;
  students?: number;
  duration?: string;
  category?: string;
  categoryColor?: string;
  featured?: boolean;
  delay?: number;
}

const CourseCard = ({
  id,
  title,
  instructor,
  image,
  price,
  discountedPrice,
  originalPrice,
  rating = 0,
  students = 0,
  duration = "",
  category = "",
  categoryColor = "hsl(217, 91%, 60%)",
  featured = false,
  delay = 0,
}: CourseCardProps) => {
  const displayPrice = discountedPrice;
  const displayOriginalPrice = originalPrice ? (originalPrice > 1000 ? originalPrice / 100 : originalPrice) : undefined;
  
  const cardContent = (
    <div 
      className="group relative overflow-hidden rounded-2xl border border-border bg-background card-hover animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="gradient-accent border-0 text-white font-medium px-3 py-1">
            Featured
          </Badge>
        </div>
      )}
      
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-prominent">
            <Play className="h-6 w-6 text-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {category && (
          <Badge 
            variant="secondary" 
            className="mb-4 font-medium rounded-full px-3"
            style={{ backgroundColor: `${categoryColor}12`, color: categoryColor }}
          >
            {category}
          </Badge>
        )}
        
        {/* Title */}
        <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 group-hover:text-muted-foreground transition-colors min-h-[3.5rem]">
          {title}
        </h3>
        
        {/* Instructor */}
        {instructor && <p className="text-sm text-muted-foreground mb-5">by {instructor}</p>}
        
        {/* Stats */}
        <div className="flex items-center gap-5 text-sm text-muted-foreground mb-5">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-5 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display">₹{displayPrice}</span>
            {displayOriginalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{displayOriginalPrice}</span>
            )}
          </div>
          <Button size="sm" className="btn-primary rounded-full px-5 group/btn">
            Enroll
            <ArrowUpRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );

  if (id) {
    return <Link to={`/courses/${id}`}>{cardContent}</Link>;
  }
  
  return cardContent;
};

export default CourseCard;
