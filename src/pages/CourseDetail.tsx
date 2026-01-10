import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Users, Clock, BarChart, Play, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/dashboard/Header";

// Mock course data - same as fallback
const mockCourses = [
  {
    id: "1",
    title: "Complete React Development Masterclass",
    instructor: "Sarah Johnson",
    priceInPaisa: 299,
    originalPrice: 499,
    rating: 4.9,
    // students: 124,
    duration: "42 hours",
    level: "Intermediate" as const,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    category: "Web Development",
    description: "Master React from fundamentals to advanced patterns. Build real-world applications with hooks, context, Redux, and more.",
    lessons: 156,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Access on mobile and TV",
      "156 downloadable resources",
      "Live Q&A sessions"
    ],
    curriculum: [
      { title: "Introduction to React", lessons: 8, duration: "2h 30m" },
      { title: "JSX and Components", lessons: 12, duration: "4h 15m" },
      { title: "State and Props", lessons: 15, duration: "5h 20m" },
      { title: "Hooks Deep Dive", lessons: 20, duration: "7h 45m" },
      { title: "Context API & Redux", lessons: 18, duration: "6h 30m" },
      { title: "Building Real Projects", lessons: 25, duration: "10h 00m" }
    ]
  },
  {
    id: "2",
    title: "Advanced Machine Learning & AI",
    instructor: "Dr. Michael Chen",
    priceInPaisa: 399,
    originalPrice: 599,
    rating: 4.8,
    students: 893,
    duration: "56 hours",
    level: "Advanced" as const,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    category: "AI & ML",
    description: "Deep dive into machine learning algorithms, neural networks, and AI applications with hands-on projects.",
    lessons: 184,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "GPU-powered notebooks",
      "184 downloadable resources",
      "Personal mentor support"
    ],
    curriculum: [
      { title: "ML Fundamentals", lessons: 15, duration: "4h 00m" },
      { title: "Supervised Learning", lessons: 22, duration: "8h 15m" },
      { title: "Neural Networks", lessons: 28, duration: "10h 30m" },
      { title: "Deep Learning", lessons: 32, duration: "12h 00m" },
      { title: "NLP & Computer Vision", lessons: 25, duration: "9h 15m" }
    ]
  },
  {
    id: "3",
    title: "iOS App Development with Swift",
    instructor: "Alex Rivera",
    priceInPaisa: 349,
    originalPrice: 549,
    rating: 4.7,
    students: 6721,
    duration: "38 hours",
    level: "Beginner" as const,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
    category: "Mobile Apps",
    description: "Learn iOS development from scratch using Swift and SwiftUI. Build and publish your own apps to the App Store.",
    lessons: 128,
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Xcode project files",
      "128 downloadable resources",
      "App Store publishing guide"
    ],
    curriculum: [
      { title: "Swift Basics", lessons: 18, duration: "5h 00m" },
      { title: "SwiftUI Fundamentals", lessons: 22, duration: "7h 30m" },
      { title: "Data & Networking", lessons: 20, duration: "6h 45m" },
      { title: "App Architecture", lessons: 18, duration: "5h 15m" },
      { title: "Publishing Your App", lessons: 10, duration: "3h 30m" }
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
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">rating</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{course.students?.toLocaleString()} students</span>
                </div> */}
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

            {/* Instructor */}
            <div className="flex items-center gap-4 p-6 rounded-2xl border border-border bg-card">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground">
                  {course.instructor?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Instructor</p>
                <p className="font-semibold text-lg">{course.instructor}</p>
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
                  Book 1:1 Session with Instructor
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
