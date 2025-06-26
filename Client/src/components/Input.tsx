import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, ...rest }, ref) => (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      className={`px-4 py-2 rounded-3xl m-2 border flex flex-col items-center w-full text-center ${className || ""}`}
      {...rest}
    />
  )
);