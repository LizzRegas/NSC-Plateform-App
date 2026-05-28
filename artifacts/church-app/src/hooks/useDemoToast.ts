import { useToast } from "@/hooks/use-toast";

export function useDemoToast() {
  const { toast } = useToast();
  return {
    toast,
    success: (title: string, description?: string) =>
      toast({ title, description }),
    error: (title: string, description?: string) =>
      toast({ title, description, variant: "destructive" }),
  };
}
