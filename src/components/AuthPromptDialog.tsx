import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, UserPlus, LogIn } from "lucide-react";

interface AuthPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

const AuthPromptDialog = ({
  open,
  onOpenChange,
  title = "Join KodingKraze6",
  description = "Create a free account to access this feature and start your learning journey.",
}: AuthPromptDialogProps) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    onOpenChange(false);
    navigate("/?mode=signup");
  };

  const handleSignIn = () => {
    onOpenChange(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground">
            <Zap className="h-8 w-8 text-background" fill="currentColor" />
          </div>
          <DialogTitle className="text-2xl font-bold font-display">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={handleSignUp}
            size="lg"
            className="w-full rounded-full gap-2"
          >
            <UserPlus className="h-5 w-5" />
            Create Free Account
          </Button>
          <Button
            onClick={handleSignIn}
            variant="outline"
            size="lg"
            className="w-full rounded-full gap-2"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Free forever. No credit card required.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPromptDialog;
