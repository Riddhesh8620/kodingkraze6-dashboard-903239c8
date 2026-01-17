import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, BarChart, Play, BookOpen, Award, CheckCircle2, ShoppingCart, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/dashboard/Header";
import { useCart, CartItem } from "@/contexts/CartContext";
import { toast } from "sonner";

// Topic interface with pricing
interface Topic {
  id: string;
  title: string;
  lessons: number;
  duration: string;
  price: number;
  originalPrice?: number;
}

interface Course {
  id: string;
  title: string;
  priceInPaisa: number;
  originalPrice: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  category: string;
  description: string;
  lessons: number;
  features: string[];
  curriculum: Topic[];
}

// Mock course data with topic pricing
const mockCourses: Course[] = [
  // Aptitude Courses
  {
    id: "1",
    title: "Logical Reasoning Masterclass",
    priceInPaisa: 29,
    originalPrice: 79,
    duration: "18 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60",
    category: "Logical Reasoning",
    description: "Master logical reasoning with pattern recognition, syllogisms, blood relations, coding-decoding, and critical thinking exercises for competitive exams.",
    lessons: 85,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Practice tests with explanations",
      "85 downloadable resources",
      "Mock test series"
    ],
    curriculum: [
      { id: "1-1", title: "Introduction to Logical Reasoning", lessons: 8, duration: "2h 00m", price: 9, originalPrice: 15 },
      { id: "1-2", title: "Pattern Recognition & Series", lessons: 15, duration: "3h 30m", price: 12, originalPrice: 18 },
      { id: "1-3", title: "Syllogisms & Statements", lessons: 12, duration: "2h 45m", price: 10, originalPrice: 16 },
      { id: "1-4", title: "Blood Relations & Directions", lessons: 14, duration: "3h 15m", price: 11, originalPrice: 17 },
      { id: "1-5", title: "Coding-Decoding", lessons: 18, duration: "4h 00m", price: 14, originalPrice: 20 },
      { id: "1-6", title: "Practice Tests & Mock Exams", lessons: 18, duration: "2h 30m", price: 8, originalPrice: 12 }
    ]
  },
  {
    id: "2",
    title: "Analytical Reasoning & Problem Solving",
    priceInPaisa: 35,
    originalPrice: 89,
    duration: "22 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
    category: "Analytical Reasoning",
    description: "Develop strong analytical skills with data interpretation, puzzles, seating arrangements, and complex problem-solving techniques.",
    lessons: 92,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Data interpretation practice sets",
      "92 downloadable resources",
      "Expert problem-solving strategies"
    ],
    curriculum: [
      { id: "2-1", title: "Fundamentals of Analytical Thinking", lessons: 10, duration: "2h 30m", price: 10, originalPrice: 16 },
      { id: "2-2", title: "Data Interpretation", lessons: 18, duration: "4h 30m", price: 15, originalPrice: 22 },
      { id: "2-3", title: "Seating Arrangements", lessons: 16, duration: "4h 00m", price: 13, originalPrice: 19 },
      { id: "2-4", title: "Puzzles & Games", lessons: 20, duration: "5h 00m", price: 16, originalPrice: 24 },
      { id: "2-5", title: "Advanced Problem Solving", lessons: 15, duration: "3h 30m", price: 12, originalPrice: 18 },
      { id: "2-6", title: "Mock Tests", lessons: 13, duration: "2h 30m", price: 8, originalPrice: 12 }
    ]
  },
  {
    id: "3",
    title: "Verbal Ability & Communication Skills",
    priceInPaisa: 25,
    originalPrice: 69,
    duration: "16 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60",
    category: "Verbal Ability",
    description: "Enhance your verbal ability with reading comprehension, vocabulary, grammar, and sentence correction for all competitive exams.",
    lessons: 72,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Vocabulary building exercises",
      "72 downloadable resources",
      "Grammar practice tests"
    ],
    curriculum: [
      { id: "3-1", title: "Reading Comprehension Strategies", lessons: 12, duration: "3h 00m", price: 9, originalPrice: 14 },
      { id: "3-2", title: "Vocabulary Building", lessons: 15, duration: "3h 30m", price: 10, originalPrice: 15 },
      { id: "3-3", title: "Grammar Fundamentals", lessons: 18, duration: "4h 00m", price: 12, originalPrice: 18 },
      { id: "3-4", title: "Sentence Correction", lessons: 14, duration: "3h 00m", price: 9, originalPrice: 14 },
      { id: "3-5", title: "Para Jumbles & Completion", lessons: 13, duration: "2h 30m", price: 8, originalPrice: 12 }
    ]
  },
  {
    id: "4",
    title: "Quantitative Aptitude Complete Course",
    priceInPaisa: 39,
    originalPrice: 99,
    duration: "28 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=60",
    category: "Quantitative Aptitude",
    description: "Complete quantitative aptitude preparation covering arithmetic, algebra, geometry, and data interpretation for placement and competitive exams.",
    lessons: 120,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Formula sheets & shortcuts",
      "120 downloadable resources",
      "Calculation speed techniques"
    ],
    curriculum: [
      { id: "4-1", title: "Number System & HCF-LCM", lessons: 18, duration: "4h 30m", price: 12, originalPrice: 18 },
      { id: "4-2", title: "Percentages, Profit & Loss", lessons: 20, duration: "5h 00m", price: 14, originalPrice: 20 },
      { id: "4-3", title: "Ratio, Proportion & Averages", lessons: 16, duration: "4h 00m", price: 11, originalPrice: 16 },
      { id: "4-4", title: "Time, Speed & Distance", lessons: 22, duration: "5h 30m", price: 15, originalPrice: 22 },
      { id: "4-5", title: "Algebra & Geometry", lessons: 24, duration: "6h 00m", price: 16, originalPrice: 24 },
      { id: "4-6", title: "Practice Tests", lessons: 20, duration: "3h 00m", price: 10, originalPrice: 15 }
    ]
  },
  // Engineering & IT Courses
  {
    id: "5",
    title: "Complete React & Next.js Development",
    priceInPaisa: 49,
    originalPrice: 129,
    duration: "42 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    category: "Web Development",
    description: "Master React from fundamentals to advanced patterns. Build real-world applications with hooks, context, Redux, and Next.js.",
    lessons: 156,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Access on mobile and TV",
      "156 downloadable resources",
      "Project-based learning"
    ],
    curriculum: [
      { id: "5-1", title: "React Fundamentals", lessons: 20, duration: "5h 00m", price: 15, originalPrice: 25 },
      { id: "5-2", title: "Hooks & State Management", lessons: 28, duration: "7h 00m", price: 18, originalPrice: 28 },
      { id: "5-3", title: "Context API & Redux", lessons: 24, duration: "6h 00m", price: 16, originalPrice: 26 },
      { id: "5-4", title: "Next.js Basics", lessons: 22, duration: "5h 30m", price: 15, originalPrice: 24 },
      { id: "5-5", title: "Advanced Patterns", lessons: 30, duration: "8h 00m", price: 20, originalPrice: 32 },
      { id: "5-6", title: "Building Projects", lessons: 32, duration: "10h 30m", price: 22, originalPrice: 35 }
    ]
  },
  {
    id: "6",
    title: "Data Structures & Algorithms in Java",
    priceInPaisa: 45,
    originalPrice: 119,
    duration: "36 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
    category: "DSA",
    description: "Comprehensive DSA course covering arrays, linked lists, trees, graphs, dynamic programming, and problem-solving techniques for interviews.",
    lessons: 145,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "500+ coding problems",
      "145 downloadable resources",
      "Interview preparation guide"
    ],
    curriculum: [
      { id: "6-1", title: "Arrays & Strings", lessons: 25, duration: "6h 00m", price: 14, originalPrice: 22 },
      { id: "6-2", title: "Linked Lists & Stacks", lessons: 22, duration: "5h 30m", price: 13, originalPrice: 20 },
      { id: "6-3", title: "Trees & Binary Search Trees", lessons: 28, duration: "7h 00m", price: 16, originalPrice: 25 },
      { id: "6-4", title: "Graphs & BFS/DFS", lessons: 24, duration: "6h 00m", price: 15, originalPrice: 24 },
      { id: "6-5", title: "Dynamic Programming", lessons: 26, duration: "7h 00m", price: 17, originalPrice: 26 },
      { id: "6-6", title: "Interview Problems", lessons: 20, duration: "4h 30m", price: 12, originalPrice: 18 }
    ]
  },
  {
    id: "7",
    title: "Python for Data Science & Machine Learning",
    priceInPaisa: 55,
    originalPrice: 139,
    duration: "38 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    category: "Data Science",
    description: "Learn Python for data science including NumPy, Pandas, Matplotlib, Scikit-learn, and machine learning fundamentals.",
    lessons: 130,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Jupyter notebooks included",
      "130 downloadable resources",
      "Real datasets for practice"
    ],
    curriculum: [
      { id: "7-1", title: "Python Basics & NumPy", lessons: 20, duration: "5h 00m", price: 15, originalPrice: 24 },
      { id: "7-2", title: "Pandas & Data Manipulation", lessons: 25, duration: "6h 30m", price: 18, originalPrice: 28 },
      { id: "7-3", title: "Data Visualization", lessons: 18, duration: "4h 30m", price: 14, originalPrice: 22 },
      { id: "7-4", title: "Machine Learning Basics", lessons: 28, duration: "7h 30m", price: 20, originalPrice: 32 },
      { id: "7-5", title: "Supervised Learning", lessons: 22, duration: "6h 00m", price: 17, originalPrice: 26 },
      { id: "7-6", title: "Projects & Case Studies", lessons: 17, duration: "8h 30m", price: 16, originalPrice: 25 }
    ]
  },
  {
    id: "8",
    title: "AWS Cloud Practitioner Certification",
    priceInPaisa: 54,
    originalPrice: 139,
    duration: "28 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    category: "Cloud Computing",
    description: "Prepare for AWS Cloud Practitioner certification with comprehensive coverage of AWS services, architecture, and best practices.",
    lessons: 98,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Practice exams included",
      "98 downloadable resources",
      "Hands-on labs"
    ],
    curriculum: [
      { id: "8-1", title: "Cloud Concepts", lessons: 15, duration: "4h 00m", price: 14, originalPrice: 22 },
      { id: "8-2", title: "AWS Core Services", lessons: 25, duration: "7h 00m", price: 18, originalPrice: 28 },
      { id: "8-3", title: "Security & Compliance", lessons: 18, duration: "5h 00m", price: 15, originalPrice: 24 },
      { id: "8-4", title: "Billing & Pricing", lessons: 12, duration: "3h 00m", price: 10, originalPrice: 16 },
      { id: "8-5", title: "Architecture Best Practices", lessons: 16, duration: "4h 30m", price: 14, originalPrice: 22 },
      { id: "8-6", title: "Practice Exams", lessons: 12, duration: "4h 30m", price: 12, originalPrice: 18 }
    ]
  },
  {
    id: "9",
    title: "Cybersecurity & Ethical Hacking",
    priceInPaisa: 59,
    originalPrice: 149,
    duration: "32 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
    category: "Cybersecurity",
    description: "Learn ethical hacking, penetration testing, network security, and cybersecurity fundamentals for a career in security.",
    lessons: 110,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Virtual lab environment",
      "110 downloadable resources",
      "Real-world hacking scenarios"
    ],
    curriculum: [
      { id: "9-1", title: "Cybersecurity Fundamentals", lessons: 16, duration: "4h 00m", price: 16, originalPrice: 26 },
      { id: "9-2", title: "Network Security", lessons: 22, duration: "6h 00m", price: 20, originalPrice: 32 },
      { id: "9-3", title: "Ethical Hacking Techniques", lessons: 28, duration: "8h 00m", price: 24, originalPrice: 38 },
      { id: "9-4", title: "Web Application Security", lessons: 20, duration: "5h 30m", price: 18, originalPrice: 28 },
      { id: "9-5", title: "Penetration Testing", lessons: 24, duration: "8h 30m", price: 22, originalPrice: 35 }
    ]
  },
  {
    id: "10",
    title: "Database Management with SQL & NoSQL",
    priceInPaisa: 35,
    originalPrice: 89,
    duration: "24 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60",
    category: "Database",
    description: "Master database concepts with SQL and NoSQL databases including MySQL, PostgreSQL, MongoDB, and database design principles.",
    lessons: 88,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Database design templates",
      "88 downloadable resources",
      "Query optimization techniques"
    ],
    curriculum: [
      { id: "10-1", title: "Database Fundamentals", lessons: 12, duration: "3h 00m", price: 10, originalPrice: 16 },
      { id: "10-2", title: "SQL Basics & Advanced", lessons: 22, duration: "6h 00m", price: 14, originalPrice: 22 },
      { id: "10-3", title: "Database Design", lessons: 16, duration: "4h 00m", price: 12, originalPrice: 18 },
      { id: "10-4", title: "MongoDB & NoSQL", lessons: 20, duration: "5h 30m", price: 14, originalPrice: 22 },
      { id: "10-5", title: "Performance & Optimization", lessons: 18, duration: "5h 30m", price: 13, originalPrice: 20 }
    ]
  },
  {
    id: "11",
    title: "Mobile App Development with Flutter",
    priceInPaisa: 49,
    originalPrice: 129,
    duration: "35 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
    category: "Mobile Apps",
    description: "Build cross-platform mobile apps with Flutter and Dart. Create beautiful iOS and Android apps from a single codebase.",
    lessons: 125,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Flutter project templates",
      "125 downloadable resources",
      "App publishing guide"
    ],
    curriculum: [
      { id: "11-1", title: "Dart Programming", lessons: 18, duration: "4h 30m", price: 14, originalPrice: 22 },
      { id: "11-2", title: "Flutter Basics", lessons: 24, duration: "6h 00m", price: 16, originalPrice: 26 },
      { id: "11-3", title: "UI Components & Layouts", lessons: 26, duration: "7h 00m", price: 18, originalPrice: 28 },
      { id: "11-4", title: "State Management", lessons: 22, duration: "5h 30m", price: 15, originalPrice: 24 },
      { id: "11-5", title: "APIs & Firebase", lessons: 20, duration: "5h 30m", price: 15, originalPrice: 24 },
      { id: "11-6", title: "Publishing Apps", lessons: 15, duration: "6h 30m", price: 14, originalPrice: 22 }
    ]
  },
  {
    id: "12",
    title: "DevOps & CI/CD Pipeline Mastery",
    priceInPaisa: 65,
    originalPrice: 169,
    duration: "30 hours",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60",
    category: "DevOps",
    description: "Master DevOps practices with Docker, Kubernetes, Jenkins, GitHub Actions, and automated deployment pipelines.",
    lessons: 105,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Pipeline templates",
      "105 downloadable resources",
      "Real-world DevOps scenarios"
    ],
    curriculum: [
      { id: "12-1", title: "DevOps Fundamentals", lessons: 14, duration: "3h 30m", price: 16, originalPrice: 26 },
      { id: "12-2", title: "Docker & Containerization", lessons: 22, duration: "6h 00m", price: 22, originalPrice: 35 },
      { id: "12-3", title: "Kubernetes", lessons: 24, duration: "7h 00m", price: 24, originalPrice: 38 },
      { id: "12-4", title: "CI/CD with Jenkins", lessons: 20, duration: "5h 30m", price: 20, originalPrice: 32 },
      { id: "12-5", title: "GitHub Actions & Automation", lessons: 25, duration: "8h 00m", price: 22, originalPrice: 35 }
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const levelColors = {
    Beginner: "hsl(142, 71%, 45%)",
    Intermediate: "hsl(199, 89%, 48%)",
    Advanced: "hsl(340, 82%, 52%)"
  };

  const fullCourseInCart = isInCart(`course-${course.id}`);
  
  const handleToggleTopic = (topicId: string) => {
    const newSelected = new Set(selectedTopics);
    if (newSelected.has(topicId)) {
      newSelected.delete(topicId);
    } else {
      newSelected.add(topicId);
    }
    setSelectedTopics(newSelected);
  };

  const handleAddFullCourse = () => {
    const cartItem: CartItem = {
      id: `course-${course.id}`,
      type: "course",
      courseId: course.id,
      courseTitle: course.title,
      price: course.priceInPaisa,
      originalPrice: course.originalPrice,
      image: course.image,
    };
    addToCart(cartItem);
  };

  const handleAddTopicToCart = (topic: Topic) => {
    if (fullCourseInCart) {
      toast.info("You already have the full course in your cart");
      return;
    }
    
    const cartItem: CartItem = {
      id: `topic-${topic.id}`,
      type: "topic",
      courseId: course.id,
      courseTitle: course.title,
      topicId: topic.id,
      topicTitle: topic.title,
      price: topic.price,
      originalPrice: topic.originalPrice,
      image: course.image,
    };
    addToCart(cartItem);
  };

  const handleAddSelectedToCart = () => {
    if (selectedTopics.size === 0) {
      toast.error("Please select at least one topic");
      return;
    }

    if (fullCourseInCart) {
      toast.info("You already have the full course in your cart");
      return;
    }

    selectedTopics.forEach(topicId => {
      const topic = course.curriculum.find(t => t.id === topicId);
      if (topic && !isInCart(`topic-${topic.id}`)) {
        const cartItem: CartItem = {
          id: `topic-${topic.id}`,
          type: "topic",
          courseId: course.id,
          courseTitle: course.title,
          topicId: topic.id,
          topicTitle: topic.title,
          price: topic.price,
          originalPrice: topic.originalPrice,
          image: course.image,
        };
        addToCart(cartItem);
      }
    });
    setSelectedTopics(new Set());
  };

  const selectedTopicsPrice = Array.from(selectedTopics).reduce((sum, topicId) => {
    const topic = course.curriculum.find(t => t.id === topicId);
    return sum + (topic?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Back Navigation */}
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <Badge 
                variant="secondary" 
                className="mb-4"
                style={{ backgroundColor: `${levelColors[course.level]}15`, color: levelColors[course.level] }}
              >
                {course.level}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden group">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="h-20 w-20 rounded-full bg-background/90 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 ml-1" fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Curriculum with Topic Pricing */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-display">Course Curriculum</h2>
                {selectedTopics.size > 0 && (
                  <Button 
                    onClick={handleAddSelectedToCart}
                    className="btn-primary"
                    disabled={fullCourseInCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add {selectedTopics.size} Topics ({formatPrice(selectedTopicsPrice)})
                  </Button>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Select individual topics or purchase the complete course for best value
              </p>

              <div className="space-y-3">
                {course.curriculum?.map((topic, index) => {
                  const topicInCart = isInCart(`topic-${topic.id}`);
                  const isSelected = selectedTopics.has(topic.id);
                  const isDisabled = fullCourseInCart || topicInCart;
                  
                  return (
                    <div 
                      key={topic.id}
                      className={`p-4 rounded-xl border transition-colors ${
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-border bg-card hover:bg-muted/50"
                      } ${isDisabled ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Checkbox */}
                        <Checkbox 
                          id={topic.id}
                          checked={isSelected}
                          onCheckedChange={() => handleToggleTopic(topic.id)}
                          disabled={isDisabled}
                        />
                        
                        {/* Topic Number */}
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-sm font-medium shrink-0">
                          {index + 1}
                        </div>
                        
                        {/* Topic Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{topic.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {topic.lessons} lessons • {topic.duration}
                          </p>
                        </div>
                        
                        {/* Price & Add Button */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <p className="font-bold">{formatPrice(topic.price)}</p>
                            {topic.originalPrice && (
                              <p className="text-xs text-muted-foreground line-through">
                                {formatPrice(topic.originalPrice)}
                              </p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant={topicInCart ? "secondary" : "outline"}
                            onClick={() => handleAddTopicToCart(topic)}
                            disabled={isDisabled}
                            className="w-24"
                          >
                            {topicInCart ? (
                              <>
                                <Check className="mr-1 h-3 w-3" />
                                Added
                              </>
                            ) : (
                              <>
                                <Plus className="mr-1 h-3 w-3" />
                                Add
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-6 rounded-2xl border border-border bg-card shadow-elevated">
              {/* Price */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Full Course Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">{formatPrice(course.priceInPaisa)}</span>
                  {course.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
                {course.originalPrice && (
                  <p className="text-sm text-green-600 mt-1">
                    Save {Math.round((1 - course.priceInPaisa / course.originalPrice) * 100)}% today!
                  </p>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                <Button 
                  className="w-full btn-accent text-lg py-6"
                  onClick={handleAddFullCourse}
                  disabled={fullCourseInCart}
                >
                  {fullCourseInCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    "Enroll - Full Course"
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full py-6"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Cart
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <p className="font-medium">This course includes:</p>
                {course.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Book Session CTA */}
              {/* <div className="mt-6 pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/sessions/book")}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Book 1:1 Session
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
