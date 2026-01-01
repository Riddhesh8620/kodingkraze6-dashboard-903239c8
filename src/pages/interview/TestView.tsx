import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Clock, AlertTriangle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTabDetection } from "@/hooks/use-tab-detection";
import { useCountdownTimer } from "@/hooks/use-countdown-timer";
import { getQuestionsByType, Question } from "@/data/mockQuestions";
import { useToast } from "@/hooks/use-toast";

const TestView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const testType = (searchParams.get("type") as 'dsa' | 'aptitude' | 'mixed') || 'mixed';
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showWarning, setShowWarning] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  // Duration based on test type
  const duration = testType === 'mixed' ? 20 * 60 : 10 * 60; // in seconds

  const handleTimeUp = useCallback(() => {
    toast({
      title: "Time's Up!",
      description: "Your test has been automatically submitted.",
      variant: "destructive",
    });
    submitTest();
  }, []);

  const { formattedTime, timeLeft, start, isRunning } = useCountdownTimer(duration, handleTimeUp);

  const handleTabSwitch = useCallback((count: number) => {
    if (testStarted) {
      setShowWarning(true);
      toast({
        title: "Warning: Tab Switch Detected!",
        description: `You have switched tabs ${count} time(s). This will be recorded.`,
        variant: "destructive",
      });
    }
  }, [testStarted, toast]);

  const { tabSwitchCount, isTabActive } = useTabDetection(handleTabSwitch);

  useEffect(() => {
    const fetchedQuestions = getQuestionsByType(testType);
    setQuestions(fetchedQuestions);
    // Start timer when component mounts
    setTestStarted(true);
    start();
  }, [testType, start]);

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const submitTest = () => {
    // Calculate score
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    // Navigate to results with state
    navigate("/interview/results", {
      state: {
        questions,
        answers,
        score: correct,
        total: questions.length,
        tabSwitchCount,
        timeSpent: duration - timeLeft,
        testType,
      },
    });
  };

  const handleSubmitClick = () => {
    const unanswered = questions.length - Object.keys(answers).length;
    if (unanswered > 0) {
      setShowSubmitConfirm(true);
    } else {
      submitTest();
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            {/* Timer */}
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-semibold",
              timeLeft <= 60 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary"
            )}>
              <Clock className="h-5 w-5" />
              {formattedTime}
            </div>

            {/* Progress */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {answeredCount} / {questions.length} answered
              </span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Tab Warning & Submit */}
            <div className="flex items-center gap-4">
              {tabSwitchCount > 0 && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden md:inline">{tabSwitchCount} tab switch(es)</span>
                </div>
              )}
              <Button onClick={handleSubmitClick} className="rounded-full">
                <Send className="mr-2 h-4 w-4" />
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="container pt-28 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {questions.map((question, index) => (
            <Card 
              key={question.id}
              className={cn(
                "transition-all duration-200",
                answers[question.id] !== undefined 
                  ? "border-primary/30 bg-primary/5" 
                  : "border-border"
              )}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full uppercase font-medium",
                        question.type === 'dsa' 
                          ? "bg-blue-500/10 text-blue-500" 
                          : "bg-green-500/10 text-green-500"
                      )}>
                        {question.type}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-medium leading-relaxed">
                      {question.question}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                  className="space-y-3"
                >
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={cn(
                        "flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer",
                        answers[question.id] === optionIndex
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                      onClick={() => handleAnswerChange(question.id, optionIndex)}
                    >
                      <RadioGroupItem 
                        value={optionIndex.toString()} 
                        id={`${question.id}-${optionIndex}`}
                      />
                      <Label 
                        htmlFor={`${question.id}-${optionIndex}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Submit Button */}
        <div className="max-w-3xl mx-auto mt-8 text-center">
          <Button 
            size="lg" 
            onClick={handleSubmitClick}
            className="rounded-full px-12"
          >
            <Send className="mr-2 h-5 w-5" />
            Submit Test
          </Button>
        </div>
      </div>

      {/* Tab Switch Warning Dialog */}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Tab Switch Detected!
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have switched away from the test tab. This activity has been recorded.
              Multiple violations may affect your test results.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>I Understand</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitConfirm} onOpenChange={setShowSubmitConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              You have {questions.length - answeredCount} unanswered question(s).
              Are you sure you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Test</AlertDialogCancel>
            <AlertDialogAction onClick={submitTest}>Submit Anyway</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Tab Inactive Overlay */}
      {!isTabActive && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur flex items-center justify-center">
          <div className="text-center p-8">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Test Paused</h2>
            <p className="text-muted-foreground">
              Return to this tab to continue your test
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestView;
