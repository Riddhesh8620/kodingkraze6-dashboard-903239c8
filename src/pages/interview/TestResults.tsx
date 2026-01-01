import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, XCircle, AlertTriangle, Clock, Home, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/mockQuestions";

interface TestResultsState {
  questions: Question[];
  answers: Record<string, number>;
  score: number;
  total: number;
  tabSwitchCount: number;
  timeSpent: number;
  testType: string;
}

const TestResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as TestResultsState;

  if (!state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <Button onClick={() => navigate("/interview")}>
            Go to Interview Ready
          </Button>
        </div>
      </div>
    );
  }

  const { questions, answers, score, total, tabSwitchCount, timeSpent, testType } = state;
  const percentage = Math.round((score / total) * 100);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (percent: number) => {
    if (percent >= 90) return { label: "Excellent!", color: "text-green-500", bg: "bg-green-500" };
    if (percent >= 70) return { label: "Good Job!", color: "text-blue-500", bg: "bg-blue-500" };
    if (percent >= 50) return { label: "Keep Practicing", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { label: "Needs Improvement", color: "text-red-500", bg: "bg-red-500" };
  };

  const grade = getGrade(percentage);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6",
            percentage >= 50 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          )}>
            {percentage >= 50 ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            Test Completed
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Your Score
          </h1>
          
          {/* Score Circle */}
          <div className="relative w-48 h-48 mx-auto my-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                className="fill-none stroke-muted"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                className={cn("fill-none transition-all duration-1000", grade.bg.replace("bg-", "stroke-"))}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 5.53} 553`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{percentage}%</span>
              <span className="text-muted-foreground">{score}/{total}</span>
            </div>
          </div>
          
          <p className={cn("text-2xl font-semibold", grade.color)}>
            {grade.label}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold">{formatTime(timeSpent)}</p>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{score}</p>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </CardContent>
          </Card>
          <Card className={tabSwitchCount > 0 ? "border-destructive/50" : ""}>
            <CardContent className="pt-6 text-center">
              <AlertTriangle className={cn("h-8 w-8 mx-auto mb-2", tabSwitchCount > 0 ? "text-destructive" : "text-muted-foreground")} />
              <p className="text-2xl font-bold">{tabSwitchCount}</p>
              <p className="text-sm text-muted-foreground">Tab Switches</p>
            </CardContent>
          </Card>
        </div>

        {/* Question Review */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-display mb-6">Question Review</h2>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== undefined;

              return (
                <Card 
                  key={question.id}
                  className={cn(
                    "border-l-4",
                    isCorrect ? "border-l-green-500" : wasAnswered ? "border-l-red-500" : "border-l-muted"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <span className={cn(
                        "flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold shrink-0",
                        isCorrect 
                          ? "bg-green-500/10 text-green-500" 
                          : wasAnswered 
                            ? "bg-red-500/10 text-red-500"
                            : "bg-muted text-muted-foreground"
                      )}>
                        {isCorrect ? <CheckCircle className="h-5 w-5" /> : wasAnswered ? <XCircle className="h-5 w-5" /> : index + 1}
                      </span>
                      <div className="flex-1">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full uppercase font-medium inline-block mb-2",
                          question.type === 'dsa' 
                            ? "bg-blue-500/10 text-blue-500" 
                            : "bg-green-500/10 text-green-500"
                        )}>
                          {question.type}
                        </span>
                        <CardTitle className="text-base font-medium leading-relaxed">
                          {question.question}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="pl-12 space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={cn(
                            "p-3 rounded-lg text-sm",
                            optionIndex === question.correctAnswer 
                              ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/30"
                              : userAnswer === optionIndex && !isCorrect
                                ? "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/30"
                                : "bg-muted/50"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {optionIndex === question.correctAnswer && (
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                            )}
                            {userAnswer === optionIndex && !isCorrect && (
                              <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                            )}
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                      {question.explanation && (
                        <p className="text-sm text-muted-foreground mt-3 p-3 bg-muted/30 rounded-lg">
                          💡 {question.explanation}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-3xl mx-auto mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
          <Button 
            size="lg"
            onClick={() => navigate("/interview/preferences")}
            className="rounded-full"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Take Another Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
