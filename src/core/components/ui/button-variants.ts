import { cva } from "class-variance-authority";


// Removed ADMIN_BUTTON_COLORS in favor of static Tailwind classes to avoid purge issues

export const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-[#007DC6] hover:bg-[#00649E] text-white shadow",
                destructive: "bg-destructive text-destructive-foreground shadow-sm",
                outline: "border border-input bg-background shadow-sm",
                secondary: "bg-secondary text-secondary-foreground shadow-sm",
                ghost: "",
                link: "text-primary underline-offset-4",
                "admin-primary": "bg-primary text-primary-foreground shadow active:bg-[#161C64]",
                "admin-secondary": "bg-transparent text-primary border border-primary active:bg-admin-sidebar-active",
                "admin-tertiary": "bg-transparent text-[#3B46C4] active:bg-[#DBDEFF]",
                
            },
            size: {
                default: "h-12 px-5 py-3",
                sm: "h-8 rounded-[8px] px-3 text-base",
                lg: "h-10 rounded-[8px] px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
); 