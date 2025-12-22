import * as React from "react"
import { cn } from "@/core/lib/utils"

type InputSize = "sm" | "md" | "lg"

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputSize
    // type?: "text" | "textarea" | "email"
}

const sizeStyles: Record<InputSize, string> = {
    sm: "h-[40px]",
    md: "h-[56px]",
    lg: "h-[200px]"
}

const baseStyles =
    "w-full rounded-[10px] transition-all px-3 py-3 text-base font-medium placeholder:font-gotham placeholder:font-normal placeholder:leading-6 placeholder:text-gray-400 bg-white border border-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    ({ className, type = "text", size = "md", autoComplete, name,  ...props }, ref,) => {
        const inputStyles = cn(
            baseStyles,
            sizeStyles[size],
            className
        );

        if (type === "textarea") {
            return (
                <textarea
                    className={cn(inputStyles, "resize-none align-top scrollbar-hide")}
                    ref={ref as React.RefObject<HTMLTextAreaElement>}
                    name={name}
                    autoComplete={autoComplete}
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            );
        }

        return (
            <input
                type={type}
                className={inputStyles}
                ref={ref as React.RefObject<HTMLInputElement>}
                name={name}
                autoComplete={autoComplete}
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };

