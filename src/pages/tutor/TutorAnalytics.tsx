import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Users, DollarSign, BookOpen, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AnalyticsData {
  totalStudents: number;
  studentGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  activeCourses: number;
  avgRating: number;
  monthlyData: { month: string; students: number; revenue: number }[];
}

const useTutorAnalytics = () => {
  return useQuery<AnalyticsData>({
    queryKey: ['tutor', 'analytics'],
    queryFn: async () => {
      const response = await fetch('/api/tutor/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
  });
};

// Fallback data
const fallbackAnalytics: AnalyticsData = {
  totalStudents: 2140,
  studentGrowth: 12.5,
  totalRevenue: 113760,
  revenueGrowth: 8.3,
  activeCourses: 2,
  avgRating: 4.85,
  monthlyData: [
    { month: 'Jan', students: 150, revenue: 7350 },
    { month: 'Feb', students: 180, revenue: 8820 },
    { month: 'Mar', students: 210, revenue: 10290 },
    { month: 'Apr', students: 250, revenue: 12250 },
    { month: 'May', students: 320, revenue: 15680 },
    { month: 'Jun', students: 380, revenue: 18620 },
  ],
};

const StatCard = ({ 
  title, 
  value, 
  growth, 
  icon: Icon, 
  prefix = '' 
}: { 
  title: string; 
  value: number | string; 
  growth?: number; 
  icon: React.ElementType;
  prefix?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</div>
      {growth !== undefined && (
        <div className={`flex items-center text-sm mt-1 ${growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          {growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {Math.abs(growth)}% from last month
        </div>
      )}
    </CardContent>
  </Card>
);

export default function TutorAnalytics() {
  const { data: analytics, isLoading } = useTutorAnalytics();
  const data = analytics || fallbackAnalytics;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display">Analytics</h2>
        <p className="text-muted-foreground">Track your performance and growth</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Students" 
          value={data.totalStudents} 
          growth={data.studentGrowth}
          icon={Users}
        />
        <StatCard 
          title="Total Revenue" 
          value={data.totalRevenue} 
          growth={data.revenueGrowth}
          icon={DollarSign}
          prefix="$"
        />
        <StatCard 
          title="Active Courses" 
          value={data.activeCourses}
          icon={BookOpen}
        />
        <StatCard 
          title="Average Rating" 
          value={data.avgRating}
          icon={Star}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Students Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {data.monthlyData.map((item, index) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full rounded-t-md transition-all hover:opacity-80"
                    style={{ 
                      height: `${(item.students / Math.max(...data.monthlyData.map(d => d.students))) * 180}px`,
                      background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)'
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {data.monthlyData.map((item, index) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-primary rounded-t-md transition-all hover:opacity-80"
                    style={{ 
                      height: `${(item.revenue / Math.max(...data.monthlyData.map(d => d.revenue))) * 180}px`
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Complete React Masterclass', students: 1250, revenue: 61250, rating: 4.8 },
              { name: 'Advanced TypeScript Patterns', students: 890, revenue: 52510, rating: 4.9 },
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <div className="font-medium">{course.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {course.students.toLocaleString()} students • ⭐ {course.rating}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">${course.revenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
