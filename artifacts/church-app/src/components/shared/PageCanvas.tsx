interface PageCanvasProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

/** Consistent page shell: padding, max-width, premium canvas background */
export function PageCanvas({ children, className = "", narrow }: PageCanvasProps) {
  return (
    <div className={`page-canvas p-5 sm:p-6 lg:p-8 ${className}`}>
      <div
        className={`page-canvas-inner mx-auto w-full space-y-6 ${narrow ? "max-w-4xl" : "max-w-[1440px]"}`}
      >
        {children}
      </div>
    </div>
  );
}
