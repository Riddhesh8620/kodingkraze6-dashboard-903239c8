import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
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

const categories = [
  "Logical Reasoning",
  "Analytical Reasoning",
  "Verbal Ability",
  "Quantitative Aptitude",
  "Web Development",
  "DSA",
  "Data Science",
  "Cloud Computing",
  "Cybersecurity",
  "Database",
  "Mobile Apps",
  "DevOps",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

const AddCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    originalPrice: "",
    duration: "",
    image: "",
  });

  const [features, setFeatures] = useState<string[]>([
    "Lifetime access to course materials",
    "Certificate of completion",
  ]);
  const [newFeature, setNewFeature] = useState("");

  const [curriculum, setCurriculum] = useState<{ title: string; lessons: string; duration: string }[]>([]);
  const [newSection, setNewSection] = useState({ title: "", lessons: "", duration: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures(prev => [...prev, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const addSection = () => {
    if (newSection.title && newSection.lessons && newSection.duration) {
      setCurriculum(prev => [...prev, { ...newSection }]);
      setNewSection({ title: "", lessons: "", duration: "" });
    }
  };

  const removeSection = (index: number) => {
    setCurriculum(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In production, this would call an API endpoint
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        features,
        curriculum: curriculum.map(s => ({
          ...s,
          lessons: parseInt(s.lessons),
        })),
        lessons: curriculum.reduce((acc, s) => acc + parseInt(s.lessons || "0"), 0),
      };

      console.log("Course data:", courseData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Course created successfully!",
        description: `"${formData.title}" has been added to the catalog.`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error creating course",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-3xl font-bold font-display mb-2">Add New Course</h1>
          <p className="text-muted-foreground">Fill in the details to create a new course.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Complete React Development Masterclass"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="49"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="129"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 42 hours"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <h2 className="text-xl font-semibold">Course Features</h2>
            
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature..."
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <h2 className="text-xl font-semibold">Curriculum Sections</h2>
            
            <div className="grid md:grid-cols-4 gap-2">
              <Input
                value={newSection.title}
                onChange={(e) => setNewSection(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Section title"
                className="md:col-span-2"
              />
              <Input
                type="number"
                value={newSection.lessons}
                onChange={(e) => setNewSection(prev => ({ ...prev, lessons: e.target.value }))}
                placeholder="Lessons"
              />
              <div className="flex gap-2">
                <Input
                  value={newSection.duration}
                  onChange={(e) => setNewSection(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Duration"
                />
                <Button type="button" onClick={addSection} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {curriculum.length > 0 && (
              <div className="space-y-2">
                {curriculum.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{section.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {section.lessons} lessons • {section.duration}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="p-2 hover:text-destructive transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddCourse;