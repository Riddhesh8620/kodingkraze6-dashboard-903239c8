import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Code2, Smartphone, Database, Brain, Cloud, Shield, LucideIcon } from "lucide-react";
import Header from "@/components/dashboard/Header";
import CourseCard from "@/components/dashboard/CourseCard";

interface CategoryInfo {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  color: string;
}

const categoryInfo: Record<string, CategoryInfo> = {
  "web-development": { 
    id: "web-development",
    icon: Code2, 
    name: "Web Development", 
    description: "Master frontend and backend technologies including React, Node.js, and modern web frameworks.",
    color: "hsl(217, 91%, 60%)"
  },
  "mobile-apps": { 
    id: "mobile-apps",
    icon: Smartphone, 
    name: "Mobile Apps", 
    description: "Build native iOS and Android applications with Swift, Kotlin, React Native, and Flutter.",
    color: "hsl(262, 83%, 58%)"
  },
  "data-science": { 
    id: "data-science",
    icon: Database, 
    name: "Data Science", 
    description: "Analyze data, build models, and extract insights using Python, SQL, and visualization tools.",
    color: "hsl(142, 71%, 45%)"
  },
  "ai-ml": { 
    id: "ai-ml",
    icon: Brain, 
    name: "AI & Machine Learning", 
    description: "Dive deep into neural networks, deep learning, NLP, and cutting-edge AI technologies.",
    color: "hsl(340, 82%, 52%)"
  },
  "cloud-computing": { 
    id: "cloud-computing",
    icon: Cloud, 
    name: "Cloud Computing", 
    description: "Master AWS, Azure, GCP and learn to architect scalable cloud-native applications.",
    color: "hsl(199, 89%, 48%)"
  },
  "cybersecurity": { 
    id: "cybersecurity",
    icon: Shield, 
    name: "Cybersecurity", 
    description: "Learn ethical hacking, penetration testing, and security best practices to protect systems.",
    color: "hsl(25, 95%, 53%)"
  },
};

// Mock courses for each category
const mockCoursesByCategory: Record<string, any[]> = {
  "web-development": [
    {
      id: "1",
      title: "Complete React Development Masterclass",
      instructor: "Sarah Johnson",
      discountedPrice: 299,
      originalPrice: 499,
      rating: 4.9,
      // students: 12453,
      duration: "42 hours",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
      category: "Web Development",
    },
    {
      id: "4",
      title: "Full-Stack JavaScript Bootcamp",
      instructor: "James Wilson",
      discountedPrice: 270,
      originalPrice: 449900,
      rating: 4.6,
      students: 5432,
      duration: "52 hours",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
      category: "Web Development",
    },
  ],
  "ai-ml": [
    {
      id: "2",
      title: "Advanced Machine Learning & AI",
      instructor: "Dr. Michael Chen",
      discountedPrice: 399,
      originalPrice: 599,
      rating: 4.8,
      students: 8932,
      duration: "56 hours",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
      category: "AI & ML",
    },
  ],
  "mobile-apps": [
    {
      id: "3",
      title: "iOS App Development with Swift",
      instructor: "Alex Rivera",
      discountedPrice: 349,
      originalPrice: 549,
      rating: 4.7,
      students: 6721,
      duration: "38 hours",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
      category: "Mobile Apps",
    },
  ],
};

const CategoryCourses = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryInfo[categoryId || ""] || categoryInfo["web-development"];
  const courses = mockCoursesByCategory[categoryId || ""] || [];
  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Back Navigation */}
        <Link 
          to="/categories"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className="mb-12">
          <div 
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
            style={{ backgroundColor: `${category.color}12`, color: category.color }}
          >
            <Icon className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                discountedPrice={course.discountedPrice}
                originalPrice={course.originalPrice}
                rating={course.rating}
                students={course.students}
                duration={course.duration}
                image={course.image}
                category={course.category}
                categoryColor={category.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">No courses available in this category yet.</p>
            <Link to="/categories" className="text-primary hover:underline mt-2 inline-block">
              Browse other categories
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryCourses;
