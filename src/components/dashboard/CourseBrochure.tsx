import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";

const courses = [
  {
    title: "Complete React & Next.js Developer Masterclass",
    instructor: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    price: 49,
    originalPrice: 129,
    rating: 4.9,
    students: 12450,
    duration: "42h",
    category: "Web Development",
    categoryColor: "hsl(217, 91%, 60%)",
    featured: true,
  },
  {
    title: "Python for Data Science & Machine Learning",
    instructor: "Dr. James Miller",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
    price: 59,
    originalPrice: 149,
    rating: 4.8,
    students: 9820,
    duration: "38h",
    category: "Data Science",
    categoryColor: "hsl(142, 71%, 45%)",
    featured: true,
  },
  {
    title: "iOS & Swift - The Complete App Development",
    instructor: "Maria Garcia",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    price: 44,
    originalPrice: 119,
    rating: 4.7,
    students: 7650,
    duration: "35h",
    category: "Mobile Apps",
    categoryColor: "hsl(262, 83%, 58%)",
  },
  {
    title: "AWS Cloud Practitioner & Solutions Architect",
    instructor: "Alex Thompson",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    price: 54,
    originalPrice: 139,
    rating: 4.9,
    students: 6340,
    duration: "28h",
    category: "Cloud Computing",
    categoryColor: "hsl(199, 89%, 48%)",
  },
  {
    title: "ChatGPT & LLMs: Building AI Applications",
    instructor: "Dr. Emily Watson",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    price: 69,
    originalPrice: 179,
    rating: 4.8,
    students: 5120,
    duration: "24h",
    category: "AI & ML",
    categoryColor: "hsl(340, 82%, 52%)",
    featured: true,
  },
  {
    title: "Ethical Hacking & Penetration Testing",
    instructor: "Marcus Johnson",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    price: 39,
    originalPrice: 99,
    rating: 4.6,
    students: 4890,
    duration: "32h",
    category: "Cybersecurity",
    categoryColor: "hsl(25, 95%, 53%)",
  },
];

const CourseBrochure = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Course Brochure</h2>
          <p className="text-muted-foreground">Top-rated courses from expert instructors</p>
        </div>
        <Button variant="ghost" className="group text-primary hover:text-primary">
          View All
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={course.title}
            {...course}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseBrochure;
