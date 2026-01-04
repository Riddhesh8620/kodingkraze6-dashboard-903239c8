import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Video, Check, Copy, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/dashboard/Header";
import { cn } from "@/lib/utils";

// Mock tutors
const tutors = [
  {
    id: "1",
    name: "Sarah Johnson",
    expertise: "React, TypeScript, Web Development",
    rate: 2999,
    avatar: "SJ",
    rating: 4.9,
    sessions: 234,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    expertise: "Machine Learning, Python, AI",
    rate: 3999,
    avatar: "MC",
    rating: 4.8,
    sessions: 189,
  },
  {
    id: "3",
    name: "Alex Rivera",
    expertise: "iOS, Swift, Mobile Development",
    rate: 2499,
    avatar: "AR",
    rating: 4.7,
    sessions: 156,
  },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const SessionBooking = () => {
  const navigate = useNavigate();
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  const selectedTutorData = tutors.find(t => t.id === selectedTutor);

  const generateMeetLink = () => {
    // Generate a mock Google Meet link
    const randomId = Math.random().toString(36).substring(2, 12);
    return `https://meet.google.com/${randomId.slice(0,3)}-${randomId.slice(3,7)}-${randomId.slice(7)}`;
  };

  const handleBookSession = () => {
    if (!selectedTutor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a tutor, date, and time slot.",
        variant: "destructive",
      });
      return;
    }

    // Generate meet link and confirm booking
    const link = generateMeetLink();
    setMeetLink(link);
    setIsBooked(true);
    
    toast({
      title: "Session Booked!",
      description: "Your 1:1 session has been scheduled successfully.",
    });
  };

  const copyMeetLink = () => {
    if (meetLink) {
      navigator.clipboard.writeText(meetLink);
      toast({
        title: "Link Copied!",
        description: "Google Meet link copied to clipboard.",
      });
    }
  };

  if (isBooked && meetLink && selectedTutorData && selectedDate) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold font-display mb-4">Session Booked!</h1>
            <p className="text-muted-foreground mb-8">
              Your 1:1 session with {selectedTutorData.name} has been confirmed.
            </p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Tutor</span>
                    <span className="font-medium">{selectedTutorData.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-medium text-green-600">₹{selectedTutorData.rate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="h-5 w-5 text-primary" />
                  <span className="font-medium">Google Meet Link</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-background rounded-lg text-sm break-all">
                    {meetLink}
                  </code>
                  <Button size="icon" variant="outline" onClick={copyMeetLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" asChild>
                    <a href={meetLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
              <Button asChild>
                <a href={meetLink} target="_blank" rel="noopener noreferrer">
                  Join Meeting
                  <Video className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Back Navigation */}
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-12">
          <Badge variant="secondary" className="mb-4">
            <Video className="h-3 w-3 mr-1" />
            1:1 Sessions
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Book a 1:1 Session
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Get personalized guidance from our expert tutors. Choose a tutor, pick a date and time, and we'll set up a Google Meet for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Step 1: Select Tutor */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                  Select a Tutor
                </CardTitle>
                <CardDescription>Choose an expert based on your learning needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {tutors.map((tutor) => (
                    <div
                      key={tutor.id}
                      onClick={() => setSelectedTutor(tutor.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all",
                        selectedTutor === tutor.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-muted-foreground/50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-lg font-bold text-muted-foreground">{tutor.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{tutor.name}</h3>
                            <span className="font-bold text-primary">₹{tutor.rate}/hr</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{tutor.expertise}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>⭐ {tutor.rating}</span>
                            <span>{tutor.sessions} sessions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Select Date */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                  Select Date & Time
                </CardTitle>
                <CardDescription>Choose a date and available time slot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                      className="rounded-md border pointer-events-auto"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-4">Available Time Slots</p>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTutorData ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedTutorData.name}</p>
                        <p className="text-sm text-muted-foreground">₹{selectedTutorData.rate}/hr</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tutor selected</p>
                  )}

                  {selectedDate ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                        <p className="text-sm text-muted-foreground">{selectedTime || "No time selected"}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No date selected</p>
                  )}

                  {selectedTutorData && (
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-muted-foreground">Session Fee</span>
                        <span className="font-bold text-lg">₹{selectedTutorData.rate}</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full btn-accent" 
                    size="lg"
                    onClick={handleBookSession}
                    disabled={!selectedTutor || !selectedDate || !selectedTime}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Book Session
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    A Google Meet link will be generated after booking
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionBooking;
