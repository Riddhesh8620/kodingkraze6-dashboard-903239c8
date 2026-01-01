import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Brain, Code, Shuffle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type TestType = 'dsa' | 'aptitude' | 'mixed';

interface TestOption {
  type: TestType;
  icon: typeof Brain;
  title: string;
  description: string;
  questionCount: number;
  duration: number; // in minutes
}

const testOptions: TestOption[] = [
  {
    type: 'aptitude',
    icon: Brain,
    title: 'Aptitude Only',
    description: 'Logical reasoning, quantitative aptitude, and problem-solving questions',
    questionCount: 5,
    duration: 10,
  },
  {
    type: 'dsa',
    icon: Code,
    title: 'DSA Only',
    description: 'Data structures, algorithms, and coding concept questions',
    questionCount: 5,
    duration: 10,
  },
  {
    type: 'mixed',
    icon: Shuffle,
    title: 'Mixed (DSA + Aptitude)',
    description: 'Comprehensive test covering both aptitude and DSA topics',
    questionCount: 10,
    duration: 20,
  },
];

const PreferenceSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<TestType | null>(null);

  const handleStartTest = () => {
    if (selectedType) {
      navigate(`/interview/test?type=${selectedType}`);
    }
  };

  const selectedOption = testOptions.find(o => o.type === selectedType);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/interview")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Select Your Test Type
          </h1>
          <p className="text-muted-foreground">
            Choose the type of assessment you want to take. Each test is timed and monitored.
          </p>
        </div>

        {/* Test Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {testOptions.map((option) => (
            <Card
              key={option.type}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-lg",
                selectedType === option.type 
                  ? "border-primary ring-2 ring-primary/20" 
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => setSelectedType(option.type)}
            >
              <CardHeader>
                <div className={cn(
                  "h-14 w-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
                  selectedType === option.type 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-primary/10 text-primary"
                )}>
                  <option.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {option.questionCount} Questions
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {option.duration} min
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Info & Start Button */}
        {selectedType && selectedOption && (
          <div className="max-w-md mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-6 rounded-2xl bg-card border border-border mb-6">
              <p className="text-sm text-muted-foreground mb-2">You selected</p>
              <p className="text-xl font-semibold mb-4">{selectedOption.title}</p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <span>{selectedOption.questionCount} Questions</span>
                <span>•</span>
                <span>{selectedOption.duration} Minutes</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={handleStartTest}
              className="group px-8 py-6 text-lg rounded-full w-full"
            >
              Start Test
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4">
              ⚠️ Switching tabs during the test will be detected and recorded
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreferenceSelection;
