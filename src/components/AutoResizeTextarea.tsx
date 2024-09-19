import React, { useRef, useEffect } from "react";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (value: string) => void;

  placeholder?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="textarea textarea-bordered w-full max-w-lg resize-none overflow-hidden"
      rows={1}
      style={{ minHeight: "3rem" }}
    />
  );
};

export default AutoResizeTextarea;
