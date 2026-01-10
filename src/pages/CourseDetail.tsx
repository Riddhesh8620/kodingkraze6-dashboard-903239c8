import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, BarChart, Play, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/dashboard/Header";

// Mock course data
const mockCourses = [
  // Aptitude Courses
  {
    id: "1",
    title: "Logical Reasoning Masterclass",
    priceInPaisa: 29,
    originalPrice: 79,
    duration: "18 hours",
    level: "Beginner" as const,
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
      { title: "Introduction to Logical Reasoning", lessons: 8, duration: "2h 00m" },
      { title: "Pattern Recognition & Series", lessons: 15, duration: "3h 30m" },
      { title: "Syllogisms & Statements", lessons: 12, duration: "2h 45m" },
      { title: "Blood Relations & Directions", lessons: 14, duration: "3h 15m" },
      { title: "Coding-Decoding", lessons: 18, duration: "4h 00m" },
      { title: "Practice Tests & Mock Exams", lessons: 18, duration: "2h 30m" }
    ]
  },
  {
    id: "2",
    title: "Analytical Reasoning & Problem Solving",
    priceInPaisa: 35,
    originalPrice: 89,
    duration: "22 hours",
    level: "Intermediate" as const,
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
      { title: "Fundamentals of Analytical Thinking", lessons: 10, duration: "2h 30m" },
      { title: "Data Interpretation", lessons: 18, duration: "4h 30m" },
      { title: "Seating Arrangements", lessons: 16, duration: "4h 00m" },
      { title: "Puzzles & Games", lessons: 20, duration: "5h 00m" },
      { title: "Advanced Problem Solving", lessons: 15, duration: "3h 30m" },
      { title: "Mock Tests", lessons: 13, duration: "2h 30m" }
    ]
  },
  {
    id: "3",
    title: "Verbal Ability & Communication Skills",
    priceInPaisa: 25,
    originalPrice: 69,
    duration: "16 hours",
    level: "Beginner" as const,
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
      { title: "Reading Comprehension Strategies", lessons: 12, duration: "3h 00m" },
      { title: "Vocabulary Building", lessons: 15, duration: "3h 30m" },
      { title: "Grammar Fundamentals", lessons: 18, duration: "4h 00m" },
      { title: "Sentence Correction", lessons: 14, duration: "3h 00m" },
      { title: "Para Jumbles & Completion", lessons: 13, duration: "2h 30m" }
    ]
  },
  {
    id: "4",
    title: "Quantitative Aptitude Complete Course",
    priceInPaisa: 39,
    originalPrice: 99,
    duration: "28 hours",
    level: "Beginner" as const,
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
      { title: "Number System & HCF-LCM", lessons: 18, duration: "4h 30m" },
      { title: "Percentages, Profit & Loss", lessons: 20, duration: "5h 00m" },
      { title: "Ratio, Proportion & Averages", lessons: 16, duration: "4h 00m" },
      { title: "Time, Speed & Distance", lessons: 22, duration: "5h 30m" },
      { title: "Algebra & Geometry", lessons: 24, duration: "6h 00m" },
      { title: "Practice Tests", lessons: 20, duration: "3h 00m" }
    ]
  },
  // Engineering & IT Courses
  {
    id: "5",
    title: "Complete React & Next.js Development",
    priceInPaisa: 49,
    originalPrice: 129,
    duration: "42 hours",
    level: "Intermediate" as const,
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
      { title: "React Fundamentals", lessons: 20, duration: "5h 00m" },
      { title: "Hooks & State Management", lessons: 28, duration: "7h 00m" },
      { title: "Context API & Redux", lessons: 24, duration: "6h 00m" },
      { title: "Next.js Basics", lessons: 22, duration: "5h 30m" },
      { title: "Advanced Patterns", lessons: 30, duration: "8h 00m" },
      { title: "Building Projects", lessons: 32, duration: "10h 30m" }
    ]
  },
  {
    id: "6",
    title: "Data Structures & Algorithms in Java",
    priceInPaisa: 45,
    originalPrice: 119,
    duration: "36 hours",
    level: "Intermediate" as const,
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
      { title: "Arrays & Strings", lessons: 25, duration: "6h 00m" },
      { title: "Linked Lists & Stacks", lessons: 22, duration: "5h 30m" },
      { title: "Trees & Binary Search Trees", lessons: 28, duration: "7h 00m" },
      { title: "Graphs & BFS/DFS", lessons: 24, duration: "6h 00m" },
      { title: "Dynamic Programming", lessons: 26, duration: "7h 00m" },
      { title: "Interview Problems", lessons: 20, duration: "4h 30m" }
    ]
  },
  {
    id: "7",
    title: "Python for Data Science & Machine Learning",
    priceInPaisa: 55,
    originalPrice: 139,
    duration: "38 hours",
    level: "Intermediate" as const,
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
      { title: "Python Basics & NumPy", lessons: 20, duration: "5h 00m" },
      { title: "Pandas & Data Manipulation", lessons: 25, duration: "6h 30m" },
      { title: "Data Visualization", lessons: 18, duration: "4h 30m" },
      { title: "Machine Learning Basics", lessons: 28, duration: "7h 30m" },
      { title: "Supervised Learning", lessons: 22, duration: "6h 00m" },
      { title: "Projects & Case Studies", lessons: 17, duration: "8h 30m" }
    ]
  },
  {
    id: "8",
    title: "AWS Cloud Practitioner Certification",
    priceInPaisa: 54,
    originalPrice: 139,
    duration: "28 hours",
    level: "Beginner" as const,
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
      { title: "Cloud Concepts", lessons: 15, duration: "4h 00m" },
      { title: "AWS Core Services", lessons: 25, duration: "7h 00m" },
      { title: "Security & Compliance", lessons: 18, duration: "5h 00m" },
      { title: "Billing & Pricing", lessons: 12, duration: "3h 00m" },
      { title: "Architecture Best Practices", lessons: 16, duration: "4h 30m" },
      { title: "Practice Exams", lessons: 12, duration: "4h 30m" }
    ]
  },
  {
    id: "9",
    title: "Cybersecurity & Ethical Hacking",
    priceInPaisa: 59,
    originalPrice: 149,
    duration: "32 hours",
    level: "Intermediate" as const,
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
      { title: "Cybersecurity Fundamentals", lessons: 16, duration: "4h 00m" },
      { title: "Network Security", lessons: 22, duration: "6h 00m" },
      { title: "Ethical Hacking Techniques", lessons: 28, duration: "8h 00m" },
      { title: "Web Application Security", lessons: 20, duration: "5h 30m" },
      { title: "Penetration Testing", lessons: 24, duration: "8h 30m" }
    ]
  },
  {
    id: "10",
    title: "Database Management with SQL & NoSQL",
    priceInPaisa: 35,
    originalPrice: 89,
    duration: "24 hours",
    level: "Beginner" as const,
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
      { title: "Database Fundamentals", lessons: 12, duration: "3h 00m" },
      { title: "SQL Basics & Advanced", lessons: 22, duration: "6h 00m" },
      { title: "Database Design", lessons: 16, duration: "4h 00m" },
      { title: "MongoDB & NoSQL", lessons: 20, duration: "5h 30m" },
      { title: "Performance & Optimization", lessons: 18, duration: "5h 30m" }
    ]
  },
  {
    id: "11",
    title: "Mobile App Development with Flutter",
    priceInPaisa: 49,
    originalPrice: 129,
    duration: "35 hours",
    level: "Beginner" as const,
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
      { title: "Dart Programming", lessons: 18, duration: "4h 30m" },
      { title: "Flutter Basics", lessons: 24, duration: "6h 00m" },
      { title: "UI Components & Layouts", lessons: 26, duration: "7h 00m" },
      { title: "State Management", lessons: 22, duration: "5h 30m" },
      { title: "APIs & Firebase", lessons: 20, duration: "5h 30m" },
      { title: "Publishing Apps", lessons: 15, duration: "6h 30m" }
    ]
  },
  {
    id: "12",
    title: "DevOps & CI/CD Pipeline Mastery",
    priceInPaisa: 65,
    originalPrice: 169,
    duration: "30 hours",
    level: "Advanced" as const,
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
      { title: "DevOps Fundamentals", lessons: 14, duration: "3h 30m" },
      { title: "Docker & Containerization", lessons: 22, duration: "6h 00m" },
      { title: "Kubernetes", lessons: 24, duration: "7h 00m" },
      { title: "CI/CD with Jenkins", lessons: 20, duration: "5h 30m" },
      { title: "GitHub Actions & Automation", lessons: 25, duration: "8h 00m" }
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  
  const formatPrice = (priceInPaisa: number) => {
    return `₹${(priceInPaisa).toLocaleString('en-IN')}`;
  };

  const levelColors = {
    Beginner: "hsl(142, 71%, 45%)",
    Intermediate: "hsl(199, 89%, 48%)",
    Advanced: "hsl(340, 82%, 52%)"
  };

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

            {/* Curriculum */}
            <div>
              <h2 className="text-2xl font-bold font-display mb-6">Course Curriculum</h2>
              <div className="space-y-3">
                {course.curriculum?.map((section, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{section.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {section.lessons} lessons • {section.duration}
                          </p>
                        </div>
                      </div>
                      <BarChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-6 rounded-2xl border border-border bg-card shadow-elevated">
              {/* Price */}
              <div className="mb-6">
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
                <Button className="w-full btn-accent text-lg py-6">
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full py-6">
                  Add to Cart
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
              <div className="mt-6 pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/sessions/book")}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Book 1:1 Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;