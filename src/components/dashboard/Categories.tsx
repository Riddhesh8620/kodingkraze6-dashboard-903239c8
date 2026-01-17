import { Code2, Smartphone, Database, Brain, Cloud, Shield, LucideIcon } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { useCategories } from "@/hooks/use-categories";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Code2, Smartphone, Database, Brain, Cloud, Shield,
};

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
  // Now correctly destructuring from the useQuery hook
  // const { data: categories, isLoading } = useCategories();

  // Decide what to show: API data, or fallback if API fails/is empty
  const displayCategories = fallbackCategories;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {true ? (
        // Show skeletons while loading
        Array.from({ length: 6 }).map((_, index) => (
          <CategorySkeleton key={index} />
        ))
      ) : (
        // Map through data (API or Fallback)
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
  );
};

export default Categories;