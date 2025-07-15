import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

        // Language-specific variants - subtle, accessible colors
        javascript:
          "border-yellow-200 bg-yellow-50 text-yellow-800 [a&]:hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
        typescript:
          "border-blue-200 bg-blue-50 text-blue-800 [a&]:hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
        python:
          "border-green-200 bg-green-50 text-green-800 [a&]:hover:bg-green-100 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
        java: "border-orange-200 bg-orange-50 text-orange-800 [a&]:hover:bg-orange-100 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-200",
        cpp: "border-indigo-200 bg-indigo-50 text-indigo-800 [a&]:hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
        csharp:
          "border-purple-200 bg-purple-50 text-purple-800 [a&]:hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-200",
        go: "border-cyan-200 bg-cyan-50 text-cyan-800 [a&]:hover:bg-cyan-100 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-200",
        html: "border-rose-200 bg-rose-50 text-rose-800 [a&]:hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200",
        css: "border-sky-200 bg-sky-50 text-sky-800 [a&]:hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200",
        shell:
          "border-slate-200 bg-slate-50 text-slate-800 [a&]:hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
