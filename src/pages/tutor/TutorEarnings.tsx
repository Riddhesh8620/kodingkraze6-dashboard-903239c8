import { useQuery } from '@tanstack/react-query';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface EarningsData {
  availableBalance: number;
  pendingBalance: number;
  totalEarnings: number;
  thisMonth: number;
  transactions: {
    id: string;
    date: string;
    type: 'sale' | 'payout' | 'refund';
    description: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
  }[];
}

const useTutorEarnings = () => {
  return useQuery<EarningsData>({
    queryKey: ['tutor', 'earnings'],
    queryFn: async () => {
      const response = await fetch('/api/tutor/earnings');
      if (!response.ok) throw new Error('Failed to fetch earnings');
      return response.json();
    },
  });
};

// Fallback data
const fallbackEarnings: EarningsData = {
  availableBalance: 4250,
  pendingBalance: 1890,
  totalEarnings: 113760,
  thisMonth: 8420,
  transactions: [
    { id: '1', date: '2024-02-15', type: 'sale', description: 'Complete React Masterclass - Alex Johnson', amount: 49, status: 'completed' },
    { id: '2', date: '2024-02-14', type: 'sale', description: 'Advanced TypeScript Patterns - Sarah Williams', amount: 59, status: 'completed' },
    { id: '3', date: '2024-02-13', type: 'payout', description: 'Monthly payout to bank account', amount: -2500, status: 'completed' },
    { id: '4', date: '2024-02-12', type: 'sale', description: 'Complete React Masterclass - Michael Chen', amount: 49, status: 'pending' },
    { id: '5', date: '2024-02-10', type: 'refund', description: 'Refund - Complete React Masterclass', amount: -49, status: 'completed' },
  ],
};

export default function TutorEarnings() {
  const { data: earnings, isLoading } = useTutorEarnings();
  const data = earnings || fallbackEarnings;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-emerald-500';
      case 'payout': return 'bg-blue-500';
      case 'refund': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-32" />
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Earnings</h2>
          <p className="text-muted-foreground">Track your revenue and payouts</p>
        </div>
        <Button 
          className="text-white"
          style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)' }}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Withdraw Funds
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-emerald-200 bg-emerald-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700">${data.availableBalance.toLocaleString()}</div>
            <p className="text-sm text-emerald-600 mt-1">Ready to withdraw</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.pendingBalance.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Clearing in 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.thisMonth.toLocaleString()}</div>
            <div className="flex items-center text-sm text-emerald-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalEarnings.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {tx.date}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getTypeColor(tx.type)} text-white`}>
                    {tx.type}
                  </Badge>
                </TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(tx.status)}>
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right font-medium ${tx.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
