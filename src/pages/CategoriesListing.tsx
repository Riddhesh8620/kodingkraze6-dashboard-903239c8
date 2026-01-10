import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Code2, Smartphone, Database, Brain, Cloud, Shield, Calculator, BarChart3, MessageSquare, Binary, Server, GitBranch, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/dashboard/Header";

interface CategoryItem {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  courseCount: number;
  color: string;
  gradient: string;
}

const categories: CategoryItem[] = [
  // Aptitude Categories
  { 
    id: "logical-reasoning",
    icon: Brain, 
    name: "Logical Reasoning", 
    description: "Master pattern recognition, syllogisms, blood relations, and critical thinking for competitive exams.",
    courseCount: 12, 
    color: "hsl(262, 83%, 58%)",
    gradient: "from-purple-500/20 to-purple-600/5"
  },
  { 
    id: "analytical-reasoning",
    icon: BarChart3, 
    name: "Analytical Reasoning", 
    description: "Develop strong analytical skills with data interpretation, puzzles, and complex problem-solving.",
    courseCount: 10, 
    color: "hsl(199, 89%, 48%)",
    gradient: "from-cyan-500/20 to-cyan-600/5"
  },
  { 
    id: "verbal-ability",
    icon: MessageSquare, 
    name: "Verbal Ability", 
    description: "Enhance reading comprehension, vocabulary, grammar, and sentence correction skills.",
    courseCount: 8, 
    color: "hsl(340, 82%, 52%)",
    gradient: "from-pink-500/20 to-pink-600/5"
  },
  { 
    id: "quantitative-aptitude",
    icon: Calculator, 
    name: "Quantitative Aptitude", 
    description: "Complete preparation for arithmetic, algebra, geometry, and data interpretation.",
    courseCount: 15, 
    color: "hsl(142, 71%, 45%)",
    gradient: "from-green-500/20 to-green-600/5"
  },
  // Engineering & IT Categories
  { 
    id: "web-development",
    icon: Code2, 
    name: "Web Development", 
    description: "Master frontend and backend technologies including React, Node.js, and modern web frameworks.",
    courseCount: 24, 
    color: "hsl(217, 91%, 60%)",
    gradient: "from-blue-500/20 to-blue-600/5"
  },
  { 
    id: "dsa",
    icon: Binary, 
    name: "Data Structures & Algorithms", 
    description: "Comprehensive DSA preparation for coding interviews and competitive programming.",
    courseCount: 18, 
    color: "hsl(25, 95%, 53%)",
    gradient: "from-orange-500/20 to-orange-600/5"
  },
  { 
    id: "data-science",
    icon: Database, 
    name: "Data Science", 
    description: "Analyze data, build models, and extract insights using Python, SQL, and visualization tools.",
    courseCount: 16, 
    color: "hsl(280, 70%, 50%)",
    gradient: "from-violet-500/20 to-violet-600/5"
  },
  { 
    id: "cloud-computing",
    icon: Cloud, 
    name: "Cloud Computing", 
    description: "Master AWS, Azure, GCP and learn to architect scalable cloud-native applications.",
    courseCount: 14, 
    color: "hsl(199, 89%, 48%)",
    gradient: "from-sky-500/20 to-sky-600/5"
  },
  { 
    id: "cybersecurity",
    icon: Shield, 
    name: "Cybersecurity", 
    description: "Learn ethical hacking, penetration testing, and security best practices.",
    courseCount: 12, 
    color: "hsl(0, 70%, 50%)",
    gradient: "from-red-500/20 to-red-600/5"
  },
  { 
    id: "database",
    icon: Server, 
    name: "Database Management", 
    description: "Master SQL, NoSQL, database design, and query optimization techniques.",
    courseCount: 10, 
    color: "hsl(45, 90%, 50%)",
    gradient: "from-yellow-500/20 to-yellow-600/5"
  },
  { 
    id: "mobile-apps",
    icon: Smartphone, 
    name: "Mobile Apps", 
    description: "Build native iOS and Android applications with Flutter and React Native.",
    courseCount: 14, 
    color: "hsl(190, 80%, 45%)",
    gradient: "from-teal-500/20 to-teal-600/5"
  },
  { 
    id: "devops",
    icon: GitBranch, 
    name: "DevOps", 
    description: "Master Docker, Kubernetes, CI/CD pipelines, and automated deployment practices.",
    courseCount: 11, 
    color: "hsl(170, 70%, 40%)",
    gradient: "from-emerald-500/20 to-emerald-600/5"
  },
];

const CategoriesListing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Navigation */}
      <div className="container py-4">
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 gradient-accent" />
        
        <div className="container py-16 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium mb-6">
              <Code2 className="h-4 w-4" />
              Browse Categories
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
              Explore Learning
              <span className="block text-gradient">Categories</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Choose from our curated categories of courses designed to take your skills to the next level. 
              Each category is packed with industry-relevant content and hands-on projects.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                onClick={() => navigate(`/categories/${category.id}`)}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-prominent animate-fade-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div 
                  className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}12`, color: category.color }}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="font-display font-bold text-xl mb-3 flex items-center gap-2">
                    {category.name}
                    <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <p className="text-sm font-medium" style={{ color: category.color }}>
                    {category.courseCount} courses available
                  </p>
                </div>
                
                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-12">
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-12 md:p-16">
          <div className="absolute inset-0 pattern-grid opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 gradient-accent" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-background/70">
                Book a 1:1 session with our experts to get personalized guidance on your learning path.
              </p>
            </div>
            <Button 
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
              onClick={() => navigate("/sessions/book")}
            >
              Book a Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesListing;
