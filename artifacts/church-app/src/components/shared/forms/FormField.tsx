interface FieldProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}

export function FormField({ label, htmlFor, children, hint }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

export const selectClass =
  "w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary transition-all";

export const textareaClass =
  "w-full text-sm bg-background border border-border rounded-xl px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none";
