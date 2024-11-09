import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";

interface ScrollButtonProps {
  targetId: string;
  direction?: "up" | "down";
}

export function ScrollButton({
  targetId,
  direction = "down",
}: ScrollButtonProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce rounded-full"
      onClick={scrollToSection}
    >
      {direction === "down" ? (
        <ChevronDown className="h-6 w-6" />
      ) : (
        <ChevronUp className="h-6 w-6" />
      )}
    </Button>
  );
}
