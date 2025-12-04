import { Code2, Smartphone, Database, Brain, Cloud, Shield } from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  { icon: Code2, title: "Web Development", courseCount: 48, color: "hsl(217, 91%, 60%)" },
  { icon: Smartphone, title: "Mobile Apps", courseCount: 32, color: "hsl(262, 83%, 58%)" },
  { icon: Database, title: "Data Science", courseCount: 27, color: "hsl(142, 71%, 45%)" },
  { icon: Brain, title: "AI & ML", courseCount: 21, color: "hsl(340, 82%, 52%)" },
  { icon: Cloud, title: "Cloud Computing", courseCount: 19, color: "hsl(199, 89%, 48%)" },
  { icon: Shield, title: "Cybersecurity", courseCount: 15, color: "hsl(25, 95%, 53%)" },
];

const Categories = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Browse by Category</h2>
          <p className="text-muted-foreground">Find the perfect course for your goals</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.title}
            {...category}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
