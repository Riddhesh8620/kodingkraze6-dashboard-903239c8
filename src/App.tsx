import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { CartProvider } from "@/contexts/CartContext";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import TutorAuth from "./pages/TutorAuth";
import TutorDashboard from "./pages/tutor/TutorDashboard";
import TutorCourses from "./pages/tutor/TutorCourses";
import TutorStudents from "./pages/tutor/TutorStudents";
import TutorAnalytics from "./pages/tutor/TutorAnalytics";
import TutorEarnings from "./pages/tutor/TutorEarnings";
import InterviewReadyLanding from "./pages/interview/InterviewReadyLanding";
import PreferenceSelection from "./pages/interview/PreferenceSelection";
import TestView from "./pages/interview/TestView";
import TestResults from "./pages/interview/TestResults";
import CourseDetail from "./pages/CourseDetail";
import CategoriesListing from "./pages/CategoriesListing";
import CategoryCourses from "./pages/CategoryCourses";
import SessionBooking from "./pages/SessionBooking";
import AddCourse from "./pages/admin/AddCourse";
import AddTopic from "./pages/admin/AddTopic";
import AddLead from "./pages/admin/AddLead";
import LeadsDashboard from "./pages/admin/LeadsDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function TutorProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'tutor') {
    return <Navigate to="/auth/tutor" replace />;
  }

  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    {/* All public routes - entire site is browsable without auth */}
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/auth/tutor" element={<TutorAuth />} />
    <Route path="/dashboard" element={<Index />} />
    <Route path="/categories" element={<CategoriesListing />} />
    <Route path="/categories/:categoryId" element={<CategoryCourses />} />
    <Route path="/courses/:id" element={<CourseDetail />} />
    <Route path="/interview" element={<InterviewReadyLanding />} />
    <Route path="/cart" element={<Cart />} />
    
    {/* Protected routes - only actions that require auth */}
    <Route 
      path="/sessions/book" 
      element={
        <ProtectedRoute>
          <SessionBooking />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/interview/preferences" 
      element={
        <ProtectedRoute>
          <PreferenceSelection />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/interview/test" 
      element={
        <ProtectedRoute>
          <TestView />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/interview/results" 
      element={
        <ProtectedRoute>
          <TestResults />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/checkout" 
      element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/checkout/success" 
      element={
        <ProtectedRoute>
          <CheckoutSuccess />
        </ProtectedRoute>
      } 
    />
    
    {/* Admin Routes */}
    <Route 
      path="/admin/add-course" 
      element={
        <AdminProtectedRoute>
          <AddCourse />
        </AdminProtectedRoute>
      } 
    />
    <Route 
      path="/admin/add-topic" 
      element={
        <AdminProtectedRoute>
          <AddTopic />
        </AdminProtectedRoute>
      } 
    />
    <Route 
      path="/admin/leads" 
      element={
        <AdminProtectedRoute>
          <LeadsDashboard />
        </AdminProtectedRoute>
      } 
    />
    <Route 
      path="/admin/leads/add" 
      element={
        <AdminProtectedRoute>
          <AddLead />
        </AdminProtectedRoute>
      } 
    />
    
    {/* Tutor Routes */}
    <Route 
      path="/tutor" 
      element={
        <TutorProtectedRoute>
          <TutorDashboard />
        </TutorProtectedRoute>
      }
    >
      <Route index element={<TutorCourses />} />
      <Route path="students" element={<TutorStudents />} />
      <Route path="analytics" element={<TutorAnalytics />} />
      <Route path="earnings" element={<TutorEarnings />} />
    </Route>
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
