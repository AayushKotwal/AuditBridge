"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/30",

    secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-white",

    ghost:
      "bg-transparent hover:bg-zinc-800 text-zinc-300",

    danger:
      "bg-red-600 hover:bg-red-500 text-white",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}

      {children}
    </button>
  );
}