import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    let baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
    
    if (variant === "primary") {
      baseStyles += " bg-blue-600 text-white hover:bg-blue-700";
    } else if (variant === "secondary") {
      baseStyles += " bg-indigo-600 text-white hover:bg-indigo-700";
    } else if (variant === "outline") {
      baseStyles += " border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900";
    }
    
    return (
      <button ref={ref} className={`${baseStyles} ${className || ""}`} {...props} />
    );
  }
);

Button.displayName = "Button";
