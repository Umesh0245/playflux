import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export const BackButton = ({ label = "Back", className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
      className={`gap-2 mb-4 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white/60 backdrop-blur-md transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default BackButton;
