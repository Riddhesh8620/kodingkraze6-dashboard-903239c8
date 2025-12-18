import { useQuery } from '@tanstack/react-query';
import { Plus, BookOpen, Users, Star, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TutorCourse {
  id: string;
  title: string;
  image: string;
  students: number;
  rating: number;
  status: 'published' | 'draft';
  price: number;
  revenue: number;
}

const useTutorCourses = () => {
  return useQuery<TutorCourse[]>({
    queryKey: ['tutor', 'courses'],
    queryFn: async () => {
      const response = await fetch('/api/tutor/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
  });
};

// Fallback data for UI preview
const fallbackCourses: TutorCourse[] = [
  { id: '1', title: 'Complete React Masterclass', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', students: 1250, rating: 4.8, status: 'published', price: 49, revenue: 61250 },
  { id: '2', title: 'Advanced TypeScript Patterns', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400', students: 890, rating: 4.9, status: 'published', price: 59, revenue: 52510 },
  { id: '3', title: 'Node.js Backend Development', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', students: 0, rating: 0, status: 'draft', price: 39, revenue: 0 },
];

const CourseSkeleton = () => (
  <Card>
    <Skeleton className="aspect-video w-full" />
    <CardContent className="p-4">
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </CardContent>
  </Card>
);

export default function TutorCourses() {
  const { data: courses, isLoading } = useTutorCourses();
  const displayCourses = courses || fallbackCourses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">My Courses</h2>
          <p className="text-muted-foreground">Manage and track your courses</p>
        </div>
        <Button 
          className="text-white"
          style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)' }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayCourses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayCourses.filter(c => c.status === 'published').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayCourses.reduce((acc, c) => acc + c.students, 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${displayCourses.reduce((acc, c) => acc + c.revenue, 0).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <CourseSkeleton key={i} />)
        ) : (
          displayCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge 
                  className={`absolute top-3 right-3 ${course.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                >
                  {course.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </span>
                  {course.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {course.rating}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-bold">${course.price}</span>
                  <span className="text-sm text-muted-foreground">
                    Revenue: ${course.revenue.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
