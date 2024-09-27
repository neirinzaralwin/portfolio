"use client";

import { cn } from "@/utils/cn"; // Ensure cn is a utility for conditionally joining class names
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

// Replace the interface with a type definition since no new members are added
type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                {...props}
                className={cn(
                    "focus:outline-none bg-transparent p-2 border border-border rounded-lg focus-visible:border-white w-full",
                    className // This ensures additional class names are concatenated
                )}
            />
        );
    }
);

Input.displayName = "Input";

// Similarly, replace the interface with a type for the Textarea
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                {...props}
                className={cn(
                    "focus:outline-none bg-transparent p-2 border border-border rounded-lg focus-visible:border-white w-full",
                    className // Same here for the Textarea component
                )}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
