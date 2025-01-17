import React, { useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

import { Textarea } from "./ui/textarea";

const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, value, ...props }, parentRef) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const ref =
    !parentRef || typeof parentRef === "function" ? textareaRef : parentRef;

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref, value]);

  return (
    <Textarea
      ref={ref}
      value={value}
      className={cn("overflow-hidden min-h-10 resize-none", className)}
      rows={1}
      {...props}
    />
  );
});

export default AutoResizeTextarea;
