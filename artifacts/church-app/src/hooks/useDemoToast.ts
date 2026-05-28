import { useToast, TOAST_DURATION } from "@/hooks/use-toast";

export function useDemoToast() {
  const { toast } = useToast();
  const notify = (options: Parameters<typeof toast>[0]) =>
    toast({ duration: TOAST_DURATION, ...options });

  return {
    toast: notify,
    success: (title: string, description?: string) =>
      notify({ title, description }),
    error: (title: string, description?: string) =>
      notify({ title, description, variant: "destructive" }),
  };
}
