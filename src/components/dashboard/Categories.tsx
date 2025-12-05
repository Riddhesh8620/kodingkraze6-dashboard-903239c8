import { Code2, Smartphone, Database, Brain, Cloud, Shield, LucideIcon } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { useCategories } from "@/hooks/use-categories";
import { Skeleton } from "@/components/ui/skeleton";

// Icon mapping from string to Lucide component
const iconMap: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Database,
  Brain,
  Cloud,
  Shield,
};

// Fallback data when API is not available
const fallbackCategories = [
  { id: "1", icon: "Code2", name: "Web Development", courseCount: 48, color: "hsl(217, 91%, 60%)" },
  { id: "2", icon: "Smartphone", name: "Mobile Apps", courseCount: 32, color: "hsl(262, 83%, 58%)" },
  { id: "3", icon: "Database", name: "Data Science", courseCount: 27, color: "hsl(142, 71%, 45%)" },
  { id: "4", icon: "Brain", name: "AI & ML", courseCount: 21, color: "hsl(340, 82%, 52%)" },
  { id: "5", icon: "Cloud", name: "Cloud Computing", courseCount: 19, color: "hsl(199, 89%, 48%)" },
  { id: "6", icon: "Shield", name: "Cybersecurity", courseCount: 15, color: "hsl(25, 95%, 53%)" },
];

const CategorySkeleton = () => (
  <div className="rounded-xl border border-border bg-card p-6">
    <Skeleton className="h-12 w-12 rounded-lg mb-4" />
    <Skeleton className="h-5 w-32 mb-2" />
    <Skeleton className="h-4 w-20" />
  </div>
);

const Categories = () => {
  const { data: categories, isLoading, isError } = useCategories();
  
  // Use API data or fallback
  const displayCategories = categories || fallbackCategories;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Browse by Category</h2>
          <p className="text-muted-foreground">Find the perfect course for your goals</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))
        ) : (
          displayCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              icon={iconMap[category.icon] || Code2}
              title={category.name}
              courseCount={category.courseCount}
              color={category.color}
              delay={index * 0.1}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Categories;
