import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Phone, Mail, BookOpen, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useCreateLead } from "@/hooks/use-leads";

const courseOptions = [
  "Logical Reasoning",
  "Analytical Reasoning",
  "Verbal Ability",
  "Quantitative Aptitude",
  "React Development",
  "Data Structures & Algorithms",
  "Python for Data Science",
  "AWS Certification",
  "Cybersecurity",
  "Database Management",
  "Flutter Development",
  "DevOps",
];

const sourceOptions = [
  "Website",
  "Social Media",
  "Referral",
  "Google Ads",
  "Facebook Ads",
  "LinkedIn",
  "Email Campaign",
  "Cold Call",
  "Walk-in",
  "Other",
];

const AddLead = () => {
  const navigate = useNavigate();
  const createLead = useCreateLead();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course_interest: "",
    source: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createLead.mutateAsync(formData);
      toast.success("Lead added successfully!");
      navigate("/admin/leads");
    } catch (error) {
      toast.error("Failed to add lead. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leads Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-primary" />
            Add New Lead
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter the lead's information to add them to your pipeline.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-xl border p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground border-b pb-3">
              Contact Information
            </h2>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="pl-10"
                    required
                  />
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className="pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="pl-10"
                      required
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground border-b pb-3">
              Lead Details
            </h2>

            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course_interest">Course Interest</Label>
                  <div className="relative">
                    <Select
                      value={formData.course_interest}
                      onValueChange={(value) =>
                        handleSelectChange("course_interest", value)
                      }
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseOptions.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Lead Source</Label>
                  <div className="relative">
                    <Select
                      value={formData.source}
                      onValueChange={(value) =>
                        handleSelectChange("source", value)
                      }
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {sourceOptions.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information about the lead..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/leads")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createLead.isPending}>
              {createLead.isPending ? "Adding..." : "Add Lead"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddLead;
