import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const sizeVariants = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  size?: keyof typeof sizeVariants;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = "sm", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      sizeVariants[size],
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check
        className={cn({
          "h-4 w-4": size === "sm",
          "h-5 w-5": size === "md",
          "h-6 w-6": size === "lg",
        })}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
