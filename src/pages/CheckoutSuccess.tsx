import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/dashboard/Header";

const CheckoutSuccess = () => {
  const location = useLocation();
  const { orderId, items } = location.state || { orderId: "", items: 0 };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold font-display mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-muted-foreground mb-2">
            Thank you for your purchase. Your {items} {items === 1 ? 'course' : 'courses/topics'} are now available.
          </p>
          
          {orderId && (
            <p className="text-sm text-muted-foreground mb-8">
              Order ID: <span className="font-mono">{orderId}</span>
            </p>
          )}

          <div className="space-y-3">
            <Button asChild className="w-full btn-primary py-6">
              <Link to="/my-courses">
                <BookOpen className="mr-2 h-5 w-5" />
                Go to My Courses
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full py-6">
              <Link to="/dashboard">
                Continue Browsing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutSuccess;
