import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/dashboard/Header";

const questionTypes = [
  { value: "dsa", label: "Data Structures & Algorithms" },
  { value: "aptitude", label: "Aptitude" },
];

const AddTopic = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"category" | "question">("category");

  // Category form
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    icon: "",
    color: "hsl(217, 91%, 60%)",
  });

  // Question form
  const [questionData, setQuestionData] = useState({
    type: "aptitude",
    question: "",
    explanation: "",
  });
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Category data:", categoryData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Category created successfully!",
        description: `"${categoryData.name}" has been added.`,
      });

      navigate("/categories");
    } catch (error) {
      toast({
        title: "Error creating category",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        ...questionData,
        options: options.filter(o => o.trim()),
        correctAnswer,
      };
      console.log("Question data:", data);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Question added successfully!",
        description: "The question has been added to the question bank.",
      });

      // Reset form
      setQuestionData({ type: "aptitude", question: "", explanation: "" });
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
    } catch (error) {
      toast({
        title: "Error adding question",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 max-w-4xl">
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">Add Topics & Questions</h1>
          <p className="text-muted-foreground">Add new categories or questions to the system.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "category" ? "default" : "outline"}
            onClick={() => setActiveTab("category")}
          >
            Add Category
          </Button>
          <Button
            variant={activeTab === "question" ? "default" : "outline"}
            onClick={() => setActiveTab("question")}
          >
            Add Question
          </Button>
        </div>

        {activeTab === "category" && (
          <form onSubmit={handleCategorySubmit} className="space-y-8">
            <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
              <h2 className="text-xl font-semibold">New Category</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="catName">Category Name *</Label>
                  <Input
                    id="catName"
                    value={categoryData.name}
                    onChange={(e) => setCategoryData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Machine Learning"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="catDesc">Description *</Label>
                  <Textarea
                    id="catDesc"
                    value={categoryData.description}
                    onChange={(e) => setCategoryData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this category..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="catIcon">Icon Name</Label>
                    <Input
                      id="catIcon"
                      value={categoryData.icon}
                      onChange={(e) => setCategoryData(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="e.g., Brain, Code2, Database"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use Lucide icon names
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="catColor">Color (HSL)</Label>
                    <Input
                      id="catColor"
                      value={categoryData.color}
                      onChange={(e) => setCategoryData(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="hsl(217, 91%, 60%)"
                    />
                    <div 
                      className="w-full h-2 rounded-full mt-2"
                      style={{ backgroundColor: categoryData.color }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </form>
        )}

        {activeTab === "question" && (
          <form onSubmit={handleQuestionSubmit} className="space-y-8">
            <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
              <h2 className="text-xl font-semibold">New Question</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Question Type *</Label>
                  <Select
                    value={questionData.type}
                    onValueChange={(value) => setQuestionData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="question">Question *</Label>
                  <Textarea
                    id="question"
                    value={questionData.question}
                    onChange={(e) => setQuestionData(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Enter your question here..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label>Options *</Label>
                  <div className="space-y-2 mt-2">
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCorrectAnswer(index)}
                          className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            correctAnswer === index 
                              ? "border-green-500 bg-green-500 text-white" 
                              : "border-muted-foreground"
                          }`}
                        >
                          {correctAnswer === index && "✓"}
                        </button>
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Click the circle to mark the correct answer
                  </p>
                </div>

                <div>
                  <Label htmlFor="explanation">Explanation</Label>
                  <Textarea
                    id="explanation"
                    value={questionData.explanation}
                    onChange={(e) => setQuestionData(prev => ({ ...prev, explanation: e.target.value }))}
                    placeholder="Explain why the correct answer is correct..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Question"}
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default AddTopic;