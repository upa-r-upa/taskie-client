import * as React from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

import { cn } from "@/lib/utils";

export interface TextAreaAutosizeProps extends TextareaAutosizeProps {
  error?: boolean;
}

const TextAreaAutosize = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaAutosizeProps
>(({ className, error, ...props }, ref) => {
  return (
    <TextareaAutosize
      className={cn(
        "w-full resize-none focus:outline-none overflow-hidden",
        error && "border-destructive",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

TextAreaAutosize.displayName = "TextAreaAutosize";

export { TextAreaAutosize };
