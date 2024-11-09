"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Bell } from "lucide-react";
import { useState } from "react";

interface NotifyAlertProps {
  issueId: string;
  description: string;
  onNotifySuccess: () => void;
  className?: string;
}

export function NotifyAlert({
  issueId,
  description,
  onNotifySuccess,
  className,
}: NotifyAlertProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNotify = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/issues/${issueId}/notify`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to notify team");

      onNotifySuccess();
      setIsOpen(false);
    } catch (error) {
      console.error("Error notifying team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <div
          className={`flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground ${className}`}
          data-notify-button
          onClick={(e) => e.stopPropagation()}
        >
          <Bell className="w-4 h-4" />
          <span className="text-sm">Notify</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Notify Response Team</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to notify the response team about this issue?
            <div className="mt-2 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">{description}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleNotify}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Notifying..." : "Notify Team"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
