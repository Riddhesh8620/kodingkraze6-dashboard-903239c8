import CourseCard from "./CourseCard";
import { useCourses } from "@/hooks/use-courses";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback data when API is not available
const fallbackCourses = [
  {
    id: "1",
    title: "Complete React & Next.js Developer Masterclass",
    instructor: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    price: 49,
    originalPrice: 129,
    rating: 4.9,
    students: 12450,
    duration: "42h",
    level: "Intermediate" as const,
    category: "Web Development",
    categoryColor: "hsl(217, 91%, 60%)",
    featured: true,
  },
  {
    id: "2",
    title: "Python for Data Science & Machine Learning",
    instructor: "Dr. James Miller",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
    price: 59,
    originalPrice: 149,
    rating: 4.8,
    students: 9820,
    duration: "38h",
    level: "Intermediate" as const,
    category: "Data Science",
    categoryColor: "hsl(142, 71%, 45%)",
    featured: true,
  },
  {
    id: "3",
    title: "iOS & Swift - The Complete App Development",
    instructor: "Maria Garcia",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    price: 44,
    originalPrice: 119,
    rating: 4.7,
    students: 7650,
    duration: "35h",
    level: "Beginner" as const,
    category: "Mobile Apps",
    categoryColor: "hsl(262, 83%, 58%)",
  },
  {
    id: "4",
    title: "AWS Cloud Practitioner & Solutions Architect",
    instructor: "Alex Thompson",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    price: 54,
    originalPrice: 139,
    rating: 4.9,
    students: 6340,
    duration: "28h",
    level: "Intermediate" as const,
    category: "Cloud Computing",
    categoryColor: "hsl(199, 89%, 48%)",
  },
  {
    id: "5",
    title: "ChatGPT & LLMs: Building AI Applications",
    instructor: "Dr. Emily Watson",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    price: 69,
    originalPrice: 179,
    rating: 4.8,
    students: 5120,
    duration: "24h",
    level: "Advanced" as const,
    category: "AI & ML",
    categoryColor: "hsl(340, 82%, 52%)",
    featured: true,
  },
  {
    id: "6",
    title: "Ethical Hacking & Penetration Testing",
    instructor: "Marcus Johnson",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    price: 39,
    originalPrice: 99,
    rating: 4.6,
    students: 4890,
    duration: "32h",
    level: "Intermediate" as const,
    category: "Cybersecurity",
    categoryColor: "hsl(25, 95%, 53%)",
  },
];

// Category color mapping
const categoryColors: Record<string, string> = {
  "Web Development": "hsl(217, 91%, 60%)",
  "Data Science": "hsl(142, 71%, 45%)",
  "Mobile Apps": "hsl(262, 83%, 58%)",
  "Cloud Computing": "hsl(199, 89%, 48%)",
  "AI & ML": "hsl(340, 82%, 52%)",
  "Cybersecurity": "hsl(25, 95%, 53%)",
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
              title={course.title}
              instructor={course.instructor}
              image={course.image}
              price={course.price}
              originalPrice={course.originalPrice}
              rating={course.rating}
              students={course.students}
              duration={course.duration}
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
