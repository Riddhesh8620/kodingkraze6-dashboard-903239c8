import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, GraduationCap, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function TutorAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && user.role === 'tutor') {
      navigate('/tutor');
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tutor/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const result = await response.json();
      
      // Store tutor data in localStorage
      localStorage.setItem('auth_token', result.token);
      localStorage.setItem('auth_user', JSON.stringify({ ...result, role: 'tutor' }));
      
      toast({
        variant: "success",
        title: "Welcome back, Tutor!",
        description: "You have successfully logged in.",
      });
      
      window.location.href = '/tutor';
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: (err as Error).message,
      });
    }
    setIsLoading(false);
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tutor/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: data.email, 
          password: data.password, 
          name: data.fullName 
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      toast({
        title: "Welcome aboard, Tutor!",
        description: "Your tutor account has been created. Please log in.",
      });
      setIsLogin(true);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: (err as Error).message,
      });
    }
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    signupForm.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pattern-dots relative overflow-hidden">
      {/* Background decorations - tutor theme (green/teal accent) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-20" style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)' }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-15" style={{ background: 'hsl(160, 78%, 50%)' }} />

      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-foreground/5 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-foreground/5 rotate-45 hidden lg:block" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to student login */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Student Login
        </Link>

        {/* Logo */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)' }}>
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight font-display">KodingKraze6</span>
          </div>
          <p className="text-muted-foreground">Tutor Portal - Inspire & Educate</p>
        </div>

        {/* Auth Card */}
        <div className="bg-background/80 backdrop-blur-xl rounded-3xl shadow-prominent border border-border/50 p-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {/* Toggle */}
          <div className="flex bg-secondary rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${isLogin
                ? 'bg-background shadow-soft text-foreground'
                : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${!isLogin
                ? 'bg-background shadow-soft text-foreground'
                : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Become a Tutor
            </button>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tutor@example.com"
                          type="email"
                          className="h-12 rounded-xl border-border/60 focus:border-emerald-500 bg-background/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            className="h-12 rounded-xl border-border/60 focus:border-emerald-500 bg-background/50 pr-12"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl text-base text-white"
                  style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)' }}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Sign In as Tutor
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            /* Signup Form */
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5">
                <FormField
                  control={signupForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          className="h-12 rounded-xl border-border/60 focus:border-emerald-500 bg-background/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tutor@example.com"
                          type="email"
                          className="h-12 rounded-xl border-border/60 focus:border-emerald-500 bg-background/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            className="h-12 rounded-xl border-border/60 focus:border-emerald-500 bg-background/50 pr-12"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            className="h-12 rounded-xl border-border/60 focus:border-emerald-500 bg-background/50 pr-12"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl text-base text-white"
                  style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 45%) 0%, hsl(180, 70%, 50%) 100%)' }}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Create Tutor Account
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "New tutor? " : "Already a tutor? "}
            <button
              onClick={toggleMode}
              className="text-foreground font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          By continuing, you agree to our Tutor Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
