import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    return (
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />

        {type === "password" && (
          <>
            {isPasswordVisible ? (
              <EyeOff
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="top-2/2 absolute right-2 top-[calc(50%-8px)] cursor-pointer"
                size={16}
              />
            ) : (
              <Eye
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="top-2/2 absolute right-2 top-[calc(50%-8px)] cursor-pointer"
                size={16}
              />
            )}
          </>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
