import { useQuery } from '@tanstack/react-query';
import { Search, Mail, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  course: string;
  progress: number;
  enrolledAt: string;
  lastActive: string;
}

const useTutorStudents = () => {
  return useQuery<Student[]>({
    queryKey: ['tutor', 'students'],
    queryFn: async () => {
      const response = await fetch('/api/tutor/students');
      if (!response.ok) throw new Error('Failed to fetch students');
      return response.json();
    },
  });
};

// Fallback data
const fallbackStudents: Student[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', course: 'Complete React Masterclass', progress: 75, enrolledAt: '2024-01-15', lastActive: '2 hours ago' },
  { id: '2', name: 'Sarah Williams', email: 'sarah@example.com', course: 'Complete React Masterclass', progress: 45, enrolledAt: '2024-02-01', lastActive: '1 day ago' },
  { id: '3', name: 'Michael Chen', email: 'michael@example.com', course: 'Advanced TypeScript Patterns', progress: 90, enrolledAt: '2024-01-20', lastActive: '30 minutes ago' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', course: 'Advanced TypeScript Patterns', progress: 30, enrolledAt: '2024-02-10', lastActive: '3 days ago' },
  { id: '5', name: 'James Wilson', email: 'james@example.com', course: 'Complete React Masterclass', progress: 100, enrolledAt: '2023-12-01', lastActive: '1 week ago' },
];

export default function TutorStudents() {
  const { data: students, isLoading } = useTutorStudents();
  const displayStudents = students || fallbackStudents;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display">Students</h2>
        <p className="text-muted-foreground">View and manage your enrolled students</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStudents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStudents.filter(s => !s.lastActive.includes('week')).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStudents.filter(s => s.progress === 100).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(displayStudents.reduce((acc, s) => acc + s.progress, 0) / displayStudents.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search students..." className="pl-10" />
        </div>
      </div>

      {/* Students Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-10 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : (
              displayStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{student.course}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getProgressColor(student.progress)} transition-all`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.enrolledAt}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.lastActive}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
