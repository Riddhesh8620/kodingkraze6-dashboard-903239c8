import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Code2, Smartphone, Database, Brain, Cloud, Shield, Calculator, BarChart3, MessageSquare, Binary, LucideIcon, Server, GitBranch, Layers } from "lucide-react";
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
  "logical-reasoning": { 
    id: "logical-reasoning",
    icon: Brain, 
    name: "Logical Reasoning", 
    description: "Master pattern recognition, syllogisms, blood relations, and critical thinking for competitive exams.",
    color: "hsl(262, 83%, 58%)"
  },
  "analytical-reasoning": { 
    id: "analytical-reasoning",
    icon: BarChart3, 
    name: "Analytical Reasoning", 
    description: "Develop strong analytical skills with data interpretation, puzzles, and complex problem-solving.",
    color: "hsl(199, 89%, 48%)"
  },
  "verbal-ability": { 
    id: "verbal-ability",
    icon: MessageSquare, 
    name: "Verbal Ability", 
    description: "Enhance reading comprehension, vocabulary, grammar, and sentence correction skills.",
    color: "hsl(340, 82%, 52%)"
  },
  "quantitative-aptitude": { 
    id: "quantitative-aptitude",
    icon: Calculator, 
    name: "Quantitative Aptitude", 
    description: "Complete preparation for arithmetic, algebra, geometry, and data interpretation.",
    color: "hsl(142, 71%, 45%)"
  },
  "web-development": { 
    id: "web-development",
    icon: Code2, 
    name: "Web Development", 
    description: "Master frontend and backend technologies including React, Node.js, and modern web frameworks.",
    color: "hsl(217, 91%, 60%)"
  },
  "dsa": { 
    id: "dsa",
    icon: Binary, 
    name: "Data Structures & Algorithms", 
    description: "Comprehensive DSA preparation for coding interviews and competitive programming.",
    color: "hsl(25, 95%, 53%)"
  },
  "data-science": { 
    id: "data-science",
    icon: Database, 
    name: "Data Science", 
    description: "Analyze data, build models, and extract insights using Python, SQL, and visualization tools.",
    color: "hsl(280, 70%, 50%)"
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
    color: "hsl(0, 70%, 50%)"
  },
  "database": { 
    id: "database",
    icon: Server, 
    name: "Database Management", 
    description: "Master SQL, NoSQL, database design, and query optimization techniques.",
    color: "hsl(45, 90%, 50%)"
  },
  "mobile-apps": { 
    id: "mobile-apps",
    icon: Smartphone, 
    name: "Mobile Apps", 
    description: "Build native iOS and Android applications with Swift, Kotlin, React Native, and Flutter.",
    color: "hsl(190, 80%, 45%)"
  },
  "devops": { 
    id: "devops",
    icon: GitBranch, 
    name: "DevOps", 
    description: "Master Docker, Kubernetes, CI/CD pipelines, and automated deployment practices.",
    color: "hsl(170, 70%, 40%)"
  },
};

// Mock courses for each category
const mockCoursesByCategory: Record<string, any[]> = {
  "logical-reasoning": [
    {
      id: "1",
      title: "Logical Reasoning Masterclass",
      price: 29,
      originalPrice: 79,
      duration: "18 hours",
      lessons: 85,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60",
      category: "Logical Reasoning",
    },
  ],
  "analytical-reasoning": [
    {
      id: "2",
      title: "Analytical Reasoning & Problem Solving",
      price: 35,
      originalPrice: 89,
      duration: "22 hours",
      lessons: 92,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
      category: "Analytical Reasoning",
    },
  ],
  "verbal-ability": [
    {
      id: "3",
      title: "Verbal Ability & Communication Skills",
      price: 25,
      originalPrice: 69,
      duration: "16 hours",
      lessons: 72,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60",
      category: "Verbal Ability",
    },
  ],
  "quantitative-aptitude": [
    {
      id: "4",
      title: "Quantitative Aptitude Complete Course",
      price: 39,
      originalPrice: 99,
      duration: "28 hours",
      lessons: 120,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=60",
      category: "Quantitative Aptitude",
    },
  ],
  "web-development": [
    {
      id: "5",
      title: "Complete React & Next.js Development",
      price: 49,
      originalPrice: 129,
      duration: "42 hours",
      lessons: 156,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
      category: "Web Development",
    },
  ],
  "dsa": [
    {
      id: "6",
      title: "Data Structures & Algorithms in Java",
      price: 45,
      originalPrice: 119,
      duration: "36 hours",
      lessons: 145,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
      category: "DSA",
    },
  ],
  "data-science": [
    {
      id: "7",
      title: "Python for Data Science & Machine Learning",
      price: 55,
      originalPrice: 139,
      duration: "38 hours",
      lessons: 130,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
      category: "Data Science",
    },
  ],
  "cloud-computing": [
    {
      id: "8",
      title: "AWS Cloud Practitioner Certification",
      price: 54,
      originalPrice: 139,
      duration: "28 hours",
      lessons: 98,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
      category: "Cloud Computing",
    },
  ],
  "cybersecurity": [
    {
      id: "9",
      title: "Cybersecurity & Ethical Hacking",
      price: 59,
      originalPrice: 149,
      duration: "32 hours",
      lessons: 110,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
      category: "Cybersecurity",
    },
  ],
  "database": [
    {
      id: "10",
      title: "Database Management with SQL & NoSQL",
      price: 35,
      originalPrice: 89,
      duration: "24 hours",
      lessons: 88,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60",
      category: "Database",
    },
  ],
  "mobile-apps": [
    {
      id: "11",
      title: "Mobile App Development with Flutter",
      price: 49,
      originalPrice: 129,
      duration: "35 hours",
      lessons: 125,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
      category: "Mobile Apps",
    },
  ],
  "devops": [
    {
      id: "12",
      title: "DevOps & CI/CD Pipeline Mastery",
      price: 65,
      originalPrice: 169,
      duration: "30 hours",
      lessons: 105,
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60",
      category: "DevOps",
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
                price={course.price}
                originalPrice={course.originalPrice}
                duration={course.duration}
                lessons={course.lessons}
                level={course.level}
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
