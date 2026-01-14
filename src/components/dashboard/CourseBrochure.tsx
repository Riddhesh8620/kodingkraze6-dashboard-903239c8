import CourseCard from "./CourseCard";
import { useCourses } from "@/hooks/use-courses";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback data when API is not available
const fallbackCourses = [
  // Aptitude Courses
  {
    id: "1",
    title: "Logical Reasoning Masterclass",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop",
    price: 29,
    originalPrice: 79,
    duration: "1h",
    lessons: 85,
    level: "Beginner",
    category: "Logical Reasoning",
    categoryColor: "hsl(262, 83%, 58%)",
    featured: true,
  },
  {
    id: "2",
    title: "Analytical Reasoning & Problem Solving",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    price: 35,
    originalPrice: 89,
    duration: "22h",
    lessons: 92,
    level: "Intermediate",
    category: "Analytical Reasoning",
    categoryColor: "hsl(199, 89%, 48%)",
    featured: true,
  },
  {
    id: "3",
    title: "Verbal Ability & Communication Skills",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop",
    price: 25,
    originalPrice: 69,
    duration: "16h",
    lessons: 72,
    level: "Beginner",
    category: "Verbal Ability",
    categoryColor: "hsl(340, 82%, 52%)",
  },
  {
    id: "4",
    title: "Quantitative Aptitude Complete Course",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop",
    price: 39,
    originalPrice: 99,
    duration: "28h",
    lessons: 120,
    level: "Beginner",
    category: "Quantitative Aptitude",
    categoryColor: "hsl(142, 71%, 45%)",
    featured: true,
  },
  // Engineering & IT Courses
  {
    id: "5",
    title: "Complete React & Next.js Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    price: 49,
    originalPrice: 129,
    duration: "42h",
    lessons: 156,
    level: "Intermediate",
    category: "Web Development",
    categoryColor: "hsl(217, 91%, 60%)",
  },
  {
    id: "6",
    title: "Data Structures & Algorithms in Java",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop",
    price: 45,
    originalPrice: 119,
    duration: "36h",
    lessons: 145,
    level: "Intermediate",
    category: "DSA",
    categoryColor: "hsl(25, 95%, 53%)",
  },
  {
    id: "7",
    title: "Python for Data Science & Machine Learning",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
    price: 55,
    originalPrice: 139,
    duration: "38h",
    lessons: 130,
    level: "Intermediate",
    category: "Data Science",
    categoryColor: "hsl(280, 70%, 50%)",
  },
  {
    id: "8",
    title: "AWS Cloud Practitioner Certification",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    price: 54,
    originalPrice: 139,
    duration: "28h",
    lessons: 98,
    level: "Beginner",
    category: "Cloud Computing",
    categoryColor: "hsl(199, 89%, 48%)",
  },
  {
    id: "9",
    title: "Cybersecurity & Ethical Hacking",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    price: 59,
    originalPrice: 149,
    duration: "32h",
    lessons: 110,
    level: "Intermediate",
    category: "Cybersecurity",
    categoryColor: "hsl(0, 70%, 50%)",
  },
  {
    id: "10",
    title: "Database Management with SQL & NoSQL",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop",
    price: 35,
    originalPrice: 89,
    duration: "24h",
    lessons: 88,
    level: "Beginner",
    category: "Database",
    categoryColor: "hsl(45, 90%, 50%)",
  },
  {
    id: "11",
    title: "Mobile App Development with Flutter",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    price: 49,
    originalPrice: 129,
    duration: "35h",
    lessons: 125,
    level: "Beginner",
    category: "Mobile Apps",
    categoryColor: "hsl(190, 80%, 45%)",
  },
  {
    id: "12",
    title: "DevOps & CI/CD Pipeline Mastery",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop",
    price: 65,
    originalPrice: 169,
    duration: "30h",
    lessons: 105,
    level: "Advanced",
    category: "DevOps",
    categoryColor: "hsl(170, 70%, 40%)",
  },
];

// Category color mapping
const categoryColors: Record<string, string> = {
  "Logical Reasoning": "hsl(262, 83%, 58%)",
  "Analytical Reasoning": "hsl(199, 89%, 48%)",
  "Verbal Ability": "hsl(340, 82%, 52%)",
  "Quantitative Aptitude": "hsl(142, 71%, 45%)",
  "Web Development": "hsl(217, 91%, 60%)",
  "DSA": "hsl(25, 95%, 53%)",
  "Data Science": "hsl(280, 70%, 50%)",
  "Cloud Computing": "hsl(199, 89%, 48%)",
  "Cybersecurity": "hsl(0, 70%, 50%)",
  "Database": "hsl(45, 90%, 50%)",
  "Mobile Apps": "hsl(190, 80%, 45%)",
  "DevOps": "hsl(170, 70%, 40%)",
  "AI & ML": "hsl(340, 82%, 52%)",
};

const CourseSkeleton = () => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <div className="p-5">
      <Skeleton className="h-5 w-24 mb-3" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-32 mb-4" />
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  </div>
);

const CourseBrochure = () => {
  const { data: courses, isLoading } = useCourses();
  
  // Use API data or fallback, and ensure we have categoryColor
  const displayCourses = (courses || fallbackCourses).map(course => ({
    ...course,
    categoryColor: categoryColors[course.category] || "hsl(217, 91%, 60%)",
  }));

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <CourseSkeleton key={index} />
          ))
        ) : (
          displayCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.image}
              price={course.price}
              originalPrice={course.originalPrice}
              duration={course.duration}
              lessons={(course as any).lessons}
              level={(course as any).level}
              category={course.category}
              categoryColor={course.categoryColor}
              featured={(course as any).featured}
              delay={index * 0.1}
            />
          ))
        )}
    </div>
  );
};

export default CourseBrochure;
